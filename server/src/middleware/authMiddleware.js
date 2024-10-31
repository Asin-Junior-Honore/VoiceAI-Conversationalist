const passport = require("passport");

const authMiddleware = passport.authenticate("jwt", { session: false });

module.exports = authMiddleware;

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     console.log("JWT Token:", token);
//   } else {
//     console.log("No token provided");
//   }

//   passport.authenticate("jwt", { session: false })(req, res, next);
// };
