export function Logger(req, res, next) {
  console.log(req.originalUrl, req.method);
  next();
}
