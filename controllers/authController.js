const models = require("../models");
const { sendResponseSuccess, sendResponseServerError, sendResponseWithPagination, sendResponseEmptyData, sendResponse } = require("../helpers/responseHelper");
const { getAllData } = require("../helpers/paginationHelper");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getPermissions = async (req, res) => {
  try {
    const result = await models.customers.findAll();
    return sendResponseSuccess(res, result);
  } catch (error) {
    return sendResponseServerError(res, error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await models.users.findOne({
      where: { username },
      include: [{ model: models.roles }],
    });

    if (!user) return sendResponse(res, 401, "Penguna tidak ditemukan", true);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendResponse(res, 401, "Password salah", true);

    const token = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role.name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true, // only can access from browser
      // secure: false, // can access from anywhere
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return sendResponse(res, 200, "Success", false, { token });
  } catch (error) {
    return sendResponseServerError(res, 500, "Failed to prosess request", true, error);
  }
};

const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized", cookies: cookies });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    const user = await models.users.findOne({
      where: { username: decoded.user.username },
      include: [{ model: models.roles }],
    });

    if (!user) return res.status(401).json({ message: "Unauthorized", decoded });

    const token = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role.name,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    return sendResponse(res, 200, "Refresh Token Success", false, { token });
  });
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  getPermissions,
  login,
  refresh,
  logout,
};
