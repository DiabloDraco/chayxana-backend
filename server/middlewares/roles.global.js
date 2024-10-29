const roles = (requiredRoles) => {
  return (req, res, next) => {
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
