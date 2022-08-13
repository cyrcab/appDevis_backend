import * as pdf from 'html-pdf';

const options = { format: 'Letter' };

export const createPdf = (req, res, next) => {
  const datas = {
    ...req.body,
  };

  const document = {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Hello world!</title>
      </head>
      <body>
        <h1>User List</h1>
        <ul>
          <li>${datas.price_ht}</li>
          <br />
        </ul>
      </body>
    </html>`,
    path: './document/test.pdf',
    type: '',
  };

  try {
    pdf
      .create(document.html, options)
      .toFile('./services/pdf/document/test.pdf', function (err, res) {
        if (err) return console.log(err);
      });
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};
