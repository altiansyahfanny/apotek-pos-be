const successFetching = (res, data) => {
	res.status(200).json({
		message: 'Success',
		data,
	});
};

const successAdd = (res, data) => {
	res.status(201).json({
		message: 'Data added successfully',
		data,
	});
};

const successUpdate = (res, data) => {
	res.status(201).json({
		message: 'Data updated successfully',
		data,
	});
};

const successDelete = (res, data) => {
	res.status(201).json({
		message: 'Data deleted successfully.',
		data,
	});
};

const error = (res, error) => {
	res.status(500).json(error);
};

module.exports = { error, successAdd, successDelete, successFetching, successUpdate };
