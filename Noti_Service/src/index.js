const express = require("express");
const morgan = require("morgan");
const apiRoutes = require("./routes");
const { ServerConfig, LoggerConfig } = require("./config");
const amqplib = require("amqplib");
const { EmailService } = require("./service");

const PORT = ServerConfig.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev", { stream: LoggerConfig.accessLogStream }));
app.use("/api", apiRoutes);

async function connectToQueue() {
    try {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
        await channel.consume("noti-queue", async (data) => {
            const obj = JSON.parse(`${Buffer.from(data.content)}`);
            await EmailService.sendEmail(
                ServerConfig.GMAIL_EMAIL,
                obj.recepientEmail,
                obj.subject,
                obj.text
            );
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is Up and Running on PORT:- ${PORT}`);
    connectToQueue();
});
