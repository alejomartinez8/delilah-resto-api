function errorHadndler(err, req, res) {
  console.log(err);
  if (typeof err === "string") {
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  } else if (err.name === "UnauthorizedError") {
    return res.status(401).json({ msg: "Unauthorized" });
  } else {
    return res.status(500).json({ msg: err.message });
  }
}
