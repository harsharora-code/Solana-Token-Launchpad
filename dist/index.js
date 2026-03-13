"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const launches_1 = __importDefault(require("./routes/launches"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    });
});
app.use("/api/auth", auth_1.default);
app.use("/api/launches", launches_1.default);
app.listen(3000);
