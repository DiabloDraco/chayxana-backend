const roles = (requiredRoles) => {
  return (req, res, next) => {
    if (err) return res.sendStatus(403);
    const roles = req.user.roles;

    const hasRole = requiredRoles.some((role) => roles.includes(role));
    if (!hasRole) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient rights" });
    }

    next();
  };
};

export default roles;
