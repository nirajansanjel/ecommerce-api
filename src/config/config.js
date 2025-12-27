import dotenv from "dotenv";
dotenv.config();

const config = {
  name: "Hello " || "",
  appUrl : process.env.APP_URL,
  port: process.env.PORT || 5000,
  MONGODB: process.env.MONGODB_URL,
  jwtSecret: process.env.JWT_secret || "",
  cloudinary: {
    cloudName: process.env.CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_SECRET_KEY || "",
  },
  resendEmail: {
    emailApiKey: process.env.EMAIL_API_KEY || "",
  },
  khaltiPayment: {
    khaltiApiKey: process.env.KHALTI_API_KEY || "",
    khaltiApiURL: process.env.KHALTI_API_URL || "",
    khaltiReturnUrl : process.env.KHALTI_RETURN_URL ||"",
  },
  gemini : {
    apiUrl : process.env.GEMINI_API_URL ||"",
    apiKey : process.env.GEMINI_API_KEY ||"",
  }
};
export default config;
