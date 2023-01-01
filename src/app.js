import express from "express";
import path from "path";
import { ppid } from "process";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

export default app;
