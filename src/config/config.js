import dotenv from "dotenv";
dotenv.config();

const config = {
  name: "Any Buy " || "",
  appUrl: process.env.APP_URL,
  port: process.env.PORT || 3000,
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
    khaltiReturnUrl: process.env.KHALTI_RETURN_URL || "",
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  },
  gemini: {
    apiUrl: process.env.GEMINI_API_URL || "",
    apiKey: process.env.GEMINI_API_KEY || "",
  },
};
export default config;
