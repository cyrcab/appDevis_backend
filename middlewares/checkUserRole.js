const checkUserRole = async (req, res, next) => {
  console.log(req.user);
  
  if (!req.user.role_id === 1) {
    return res.status(401).send({ message: "Vous n'avez pas l'autorisation" });
  }
  next();
};

export default checkUserRole;
