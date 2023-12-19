import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ulices.dickinson81@ethereal.email",
      pass: "pKsJKtwmsMmRScbH7U",
    },
  });

  let info = await transporter.sendMail({
    from: '"Amit Tiwari 👻" <amit@ng>',
    to: "iam@gmail.com",
    subject: "Hello amit",
    text: "this is only for test",
    html: "<b>Congutulation to succesfully send mail</b>",
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

export default sendMail;
