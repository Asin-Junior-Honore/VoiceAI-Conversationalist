const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error("Error in asyncHandler:", error);
      res.status(500).json({ error: error.message || "Server Error" });
    });
  
  module.exports = asyncHandler;
  