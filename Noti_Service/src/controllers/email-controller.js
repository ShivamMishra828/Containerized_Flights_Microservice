const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { EmailService } = require("../service");
const { StatusCodes } = require("http-status-codes");

async function create(req, res) {
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail,
        });
        return res
            .status(StatusCodes.CREATED)
            .json(
                new SuccessResponse(
                    response,
                    "Successfully created a ticket object."
                )
            );
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(error, "can't create a new ticket object.")
            );
    }
}

module.exports = {
    create,
};
