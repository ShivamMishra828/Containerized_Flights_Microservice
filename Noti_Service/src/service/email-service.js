const { TicketRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const { MailConfig } = require("../config");
const { StatusCodes } = require("http-status-codes");

const ticketRepository = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = await MailConfig.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text,
        });
        console.log("Mail Sent Successfully");
        return response;
    } catch (error) {
        throw new AppError(
            "Something went wrong while sending email",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function createTicket(data) {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        throw new AppError(
            "Something went wrong while creating a new ticket object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getPendingEmail() {
    try {
        const response = await ticketRepository.getPendingTicket();
        return response;
    } catch (error) {
        throw new AppError(
            "Something went wrong while fetching pending emails",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmail,
};
