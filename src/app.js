import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import cors from "cors";

import config from "./config/config.js";
import productRoutes from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import database from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import userAuth from "./routes/authRoute.js";
import logger from "./middlewares/logger.js";
import connectCloudinary from "./config/cloudinary.js";

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
database();
connectCloudinary();
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    name: config.name,
  });
});
app.use(logger);
app.use(bodyParser.json());

app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api", upload.single("image"), userRoute);
app.use("/api/auth", userAuth);
app.use("/api/orders", orderRoute);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}..`);
});
