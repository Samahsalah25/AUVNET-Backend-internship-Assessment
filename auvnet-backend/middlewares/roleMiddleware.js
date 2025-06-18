const role= (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.type)) {
        return res.status(403).json({ message: "لا تملك الصلاحية للدخول" });
      }
      next();
    };
  };
  
  module.exports ={role};
  