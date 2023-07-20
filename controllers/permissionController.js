const models = require("../models");
const { sendResponseSuccess, sendResponseServerError } = require("../helpers/responseHelper");
const { sequelize } = require("../models");

const arrayToObject = (permissions) => {
  let obj = {};

  for (let i = 0; i < permissions.length; i++) {
    obj[permissions[i].permission_key] = permissions[i].roles;
  }

  return obj;
};

const getAll = async (req, res) => {
  try {
    const role_access_modules = await models.modules.findAll({
      attributes: ["permission_key"],
      include: [{ model: models.roles, attributes: ["name"] }],
    });

    const new_role_access_modules = role_access_modules.map((ram) => ({
      permission_key: ram.permission_key,
      roles: ram.roles.map((role) => role.name),
    }));

    const role_access_menus = await models.menus.findAll({
      attributes: ["permission_key"],
      include: [{ model: models.roles, attributes: ["name"] }],
    });

    const new_role_access_menus = role_access_menus.map((ram) => ({
      permission_key: ram.permission_key,
      roles: ram.roles.map((role) => role.name),
    }));

    const role_access_menu_actions = await models.menu_actions.findAll({
      attributes: ["permission_key"],
      include: [{ model: models.roles, attributes: ["name"] }],
    });

    const new_role_access_menu_actions = role_access_menu_actions.map((ram) => ({
      permission_key: ram.permission_key,
      roles: ram.roles.map((role) => role.name),
    }));

    const permissions = [...new_role_access_modules, ...new_role_access_menus, ...new_role_access_menu_actions];

    const result = arrayToObject(permissions);

    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

const getData = async (id_params) => {
  const result = await models.modules.findAll({
    include: [{ model: models.roles }, { model: models.menus, include: [{ model: models.roles }, { model: models.menu_actions, include: [{ model: models.roles }] }] }],
  });
  const data = result.map((mod) => {
    const { name, menus, permission_key, id, roles } = { ...mod.get({ plain: true }) };
    const checked = mod.roles.some((role) => role.id === parseInt(id_params));
    return {
      checked,
      id,
      name,
      permission_key,
      exist: checked,
      menus: menus.map((menu) => {
        const { name, menu_actions, permission_key, id } = menu;
        const checked = menu.roles.some((role) => role.id === parseInt(id_params));
        return {
          checked,
          id,
          name,
          permission_key,
          exist: checked,
          menu_actions: menu_actions.map((menu_action) => {
            const { name, permission_key, id } = menu_action;
            const checked = menu_action.roles.some((role) => role.id === parseInt(id_params));
            return {
              checked,
              id,
              name,
              permission_key,
              exist: checked,
            };
          }),
        };
      }),
    };
  });

  return data;
};

const getPermissionModule = async (req, res) => {
  const { id: id_params } = req.params;

  try {
    const data = await getData(id_params);

    return sendResponseSuccess(res, data);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

const update = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const role_id = parseInt(id);

  const transaction = await sequelize.transaction();
  try {
    const updateRelation = async () => {
      for (const mod of data) {
        if (mod.exist && !mod.checked) {
          // delete
          await models.role_access_modules.destroy({ where: { role_id, module_id: mod.id }, transaction });
        }
        if (!mod.exist && mod.checked) {
          // create
          await models.role_access_modules.create({ role_id, module_id: mod.id }, transaction);
        }

        for (const menu of mod.menus) {
          if (menu.exist && !menu.checked) {
            // delete
            await models.role_access_menus.destroy({ where: { role_id, menu_id: menu.id }, transaction });
          }
          if (!menu.exist && menu.checked) {
            // create
            await models.role_access_menus.create({ role_id, menu_id: menu.id }, transaction);
          }
          for (const menu_action of menu.menu_actions) {
            if (menu_action.exist && !menu_action.checked) {
              // delete
              await models.role_access_menu_actions.destroy({ where: { role_id, menu_action_id: menu_action.id }, transaction });
            }
            if (!menu_action.exist && menu_action.checked) {
              // create
              await models.role_access_menu_actions.create({ role_id, menu_action_id: menu_action.id }, transaction);
            }
          }
        }
      }
    };

    await updateRelation();
    await transaction.commit();

    let result = await getData(role_id);

    return sendResponseSuccess(res, result, 201);
  } catch (error) {
    await transaction.rollback();
    return sendResponseServerError(res, error);
  }
};

module.exports = {
  getPermissionModule,
  getAll,
  update,
};
