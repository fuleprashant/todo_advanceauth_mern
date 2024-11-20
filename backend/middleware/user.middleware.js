import jwt from "jsonwebtoken";

export const useMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log("the toekn of the useMiddleware file is", token);

  if (!token) {
    return res
      .status(400)
      .json({ message: "access denied , no token provided" });
  }

  try {
    // verify token with jwt
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log("the error is", error);
    return res
      .status(500)
      .json({ message: "the problem is in backend , user is required" });
  }
};
