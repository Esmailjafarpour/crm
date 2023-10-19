import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { verifyToken, verifyPassword } from "@/utils/auth";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    console.log("error in connect to the database", error.message);
    res
      .status(500)
      .json({ status: "failed", message: "Error in connection to DB" });
  }

  const { name, lastName, password } = req.body;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not Logged In!" });
  }

  const result = verifyToken(token, secretKey);

  if (!result) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not unauthorized!" });
  }
  
  const user = await User.findOne({ email: result.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return res.status(422).json({
      status: "failed",
      message: "Password is incorrect!",
    });
  }

  user.name = name;
  user.lastName = lastName;
  user.save();

  
    // const serializedd = serialize("token", "", { path: "/", maxAge: 0 });

      const tokenUpdata = sign(
        { name: name, lastName: lastName, email: result.email },
        secretKey,
        { expiresIn: expiration }
        );
        const serialized = serialize("token", tokenUpdata, {
          httpOnly: true,
          maxAge: expiration,
          path: "/",
        });
        
        console.log(serialized)
        
        res
        .status(200)
        .setHeader("Set-Cookie", serialized)
        .json({
          status: "success",
          data: { name, lastName, email: result.email },
        });
      
}

export default handler;
