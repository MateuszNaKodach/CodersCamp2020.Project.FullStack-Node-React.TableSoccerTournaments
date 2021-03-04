import { TableSoccerTournamentsApplication } from './app';
import NodeMailer from 'nodemailer';

const port = process.env.REST_API_PORT || 5000;

TableSoccerTournamentsApplication().then(({ restApi }) =>
  restApi.listen(port, () => {
    console.log(`[App]: REST API listening on port ${port}`);
    console.log(`[App]: You can access REST API documentation at http://localhost:${port}/rest-api-docs`);

      const transporter = NodeMailer.createTransport({
          host: "mailhog",
          port: 1025
      });

      restApi.get("/send_email/:email", (req, res) => {
          try {
          const { email } = req.params;

          const messageStatus = transporter.sendMail({
              from: "My Company <company@companydomain.org>",
              to: email,
              subject: "Hi Mailhog!",
              text: "This is the email content",
          });

          if (!messageStatus) res.json("Error sending message!").status(500);

          res.json("Sent!").status(200);
          } catch (error) {
              res.status(error.response.status)
              return res.send(error.message);
          }
      });
  }),
);
