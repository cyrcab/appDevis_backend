import * as pdf from 'html-pdf';
import * as fs from 'fs';
import * as path from 'path';

var options = { format: 'Letter' };

const document = {
  html: `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Hello world!</title>
    </head>
    <body>
      <h1>User List</h1>
      <!-- <ul>
        {{#each users}}
        <li>Name: {{this.name}}</li>
        <li>Age: {{this.age}}</li>
        <br />
        {{/each}}
      </ul> -->
    </body>
  </html>`,
  path: './document/test.pdf',
  type: '',
};

export const createPdf = (req, res, next) => {
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
