import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db";
import authRoutes from "./routes/auth.routes";
import urlRoutes from "./routes/url.routes";
import { UrlController } from "./controllers/url.controller";
import { UrlService } from "./services/url.service";

configDotenv();

const app = express();

connectDB();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

const urlService = new UrlService();
const urlController = new UrlController(urlService);

app.get('/:shortCode', urlController.redirect.bind(urlController));


app.get('/api/test', (req, res) => {
    res.status(200).json({ message: "ok" });
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}✅`);
});

