import * as nodemailer from 'nodemailer';

export const mailSender = async (req, res, next) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    if (!testAccount) {
      return res.status(401).end();
    }

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'cyril.cabrolier@gmail.com', // generated ethereal user
        type: 'OAuth2', // generated ethereal password
      },
    });


    if (!transporter) {
      return res.status(401).end();
    } else {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log('Server is ready to take our messages');
        }
      });
    }

    // let info = await transporter.sendMail({
    //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
    //   to: 'cyr.cab@hotmail.fr', // list of receivers
    //   subject: 'Hello ✔', // Subject line
    //   text: 'Hello world?', // plain text body
    //   html: '<b>Hello world?</b>', // html body
    // });

    // if (info.rejected.length > 0) {
    //   return res.status(401).end();
    // }

    return res.status(201).json({ message: 'its okay' });
  } catch (error) {
    console.log(error);
    next(error);
    return res.status(500).end();
  }
};
