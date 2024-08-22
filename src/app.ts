import config from "./config/app-config.js";
import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

import billRoutes from "./routes/bill-route.js"
import  userRoutes from "./routes/user-route.js"
import groupRoutes from "./routes/group-route.js"
import paymentRoutes from "./routes/payment-route.js"

const app = express();
app.use(express.json());


app.use("/api/v1/user",userRoutes);
app.use("/api/v1/bill",billRoutes);
app.use("/api/v1/group",groupRoutes);
app.use("/api/v1/payment",paymentRoutes)


const port = config.port;
connectDB(config.DB_CONNECTION);

app.use(errorMiddleware);

app.listen(port, () => {
console.log(`express listening on port ${port}`);
});