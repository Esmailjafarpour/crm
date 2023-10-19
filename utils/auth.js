import { hash, compare } from "bcryptjs";
import { verify } from "jsonwebtoken";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  console.log("hashedPassword", hashedPassword);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const inValid = await compare(password, hashedPassword);
  return inValid;
}

function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    return {
      email: result.email,
      name: result.name || "",
      lastName: result.lastName || ""
    };
  } catch (error) {
    return false;
  }
}

export { verifyToken, hashPassword, verifyPassword };
