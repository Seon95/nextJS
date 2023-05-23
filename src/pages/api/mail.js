const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handler = async (req, res) => {
  const { input, message } = JSON.parse(req.body);
  if (req.method === "POST") {
    try {
      await transporter.sendMail({
        from: '"Fred Foo 👻" <marouan@s10.syntradeveloper.be>',
        to: "marouan@s10.syntradeveloper.be",
        subject: input,
        text: message,
        html: message,
      });
      res.json("ok");
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the email." });
    }
  } else {
    res.status(400).json({ error: "Invalid request method." });
  }
};

export default handler;
