const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError(
                "Can't fetch data corresponding to the id.",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        const response = await this.model.update(data, {
            where: {
                id: id,
            },
        });
        if (!response) {
            throw new AppError(
                "Can't update data corresponding to the id.",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id,
            },
        });
        if (!response) {
            throw new AppError(
                "Can't delete data corresponding to the id.",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }
}

module.exports = CrudRepository;
