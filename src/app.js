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


const app = express();

const upload = multer({ storage: multer.memoryStorage() });

database();
connectCloudinary();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    status: "Running...",
    version: "1.0.0",
  });
});

app.use("/api/products", upload.array("images", 5), productRoutes);
app.use("/api", upload.single("image"), userRoute);
app.use("/api/auth", userAuth);
app.use("/api/orders", orderRoute);

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}..`);
});
