
import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import movieRoutes from "./src/routes/movieRoutes";
import userRoutes from "./src/routes/userRoutes";
import cors from "cors";
 
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

app.get("/test", (req, res) => res.send("working"));



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
