async function testApi(req, res, next) {
  try {
    console.log('piiiiiiiiing');
    res.json({ message: 'piiiiiing', testDone: true }).status(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = testApi;
