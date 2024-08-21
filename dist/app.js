import config from "./config/app-config.js";
import express from "express";
import userRoutes from "./routes/user-route.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
const port = config.port;
connectDB(config.DB_CONNECTION);
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});
