async function handleTestApi(req, res, next) {
  try {
    res.json({ message: 'piiiiiing', testDone: true }).status(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
