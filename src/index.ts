import express from "express";
import {authRoutes} from './routes/auth'

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    })

})

app.get("/api/auth", authRoutes)


app.listen(3000);
