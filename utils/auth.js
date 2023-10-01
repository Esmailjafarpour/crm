import { hash , compare } from "bcryptjs";
async function hashPassword(password) {
     const hashedPassword = await hash(password , 12);
     console.log("hashedPassword" , hashedPassword)
     return hashedPassword;
}

async function verifyPassword(password , hashedPassword){
     const inValid = await compare(password , hashedPassword)
     console.log("inValid",inValid)
     return inValid;
}

export { hashPassword , verifyPassword };