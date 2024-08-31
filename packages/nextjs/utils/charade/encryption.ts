import crypto from "crypto";

const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
export function encrypt(text: string) {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
// Decrypt function
export function decrypt(encryptedText: string) {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
