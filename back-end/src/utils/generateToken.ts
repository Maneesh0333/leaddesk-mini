import jwt from "jsonwebtoken";

interface Payload {
  id: string;
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};