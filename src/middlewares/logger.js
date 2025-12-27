const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  console.log(`Method is ${method} and URL is ${url}`);
  next();
};
export default logger;
