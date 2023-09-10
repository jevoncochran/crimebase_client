import jwt from "jsonwebtoken";

const signJwtToken = (payload, options) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
};

export { signJwtToken };
