import express from "express";
import authRoutes from './routes/auth'
import launchRoutes from "./routes/launches"

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    })

})

app.use("/api/auth", authRoutes);
app.use("/api/launches", launchRoutes);


app.listen(3000);
