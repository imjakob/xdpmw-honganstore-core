import jwt from "jsonwebtoken";

/**
 * private function generateToken
 * @param user  object
 * @param secretSignature string
 * @param tokenLife string
 * @param role number(0: admin, 1: user)
 */
let generateToken = (user: object, secretSignature: string, tokenLife: string = "24h", role: number = 1) => {
  return new Promise( (resolve, reject) => {
    // Định nghĩa thông tin user để lưu vào token
    const userData = { ...user, role: role === 0 ? "admin" : "user" };

    // Thực hiện ký và tạo token
    jwt.sign(
      {data: userData},
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife
      },
      (error, token) => {
        if ( error )
          return reject(error);
        resolve(token);
      }
    );
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token 
 * @param {*} secretKey 
 */
let verifyToken = (token: string, secretKey: string) => {
  return new Promise( (resovle, reject) => {
    jwt.verify(token, secretKey, (error, decode) => {
      if ( error )
        return reject(error);
      resovle(decode);
    });
  });
};

export default {
  generateToken,
  verifyToken
};