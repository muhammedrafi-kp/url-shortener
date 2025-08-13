import express from "express";
import { configDotenv } from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/db";
import authRoutes from "./routes/auth.routes";
import urlRoutes from "./routes/url.routes";
import { UrlController } from "./controllers/url.controller";
import { UrlService } from "./services/url.service";

configDotenv();

const app = express();

connectDB();
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

const urlService = new UrlService();
const urlController = new UrlController(urlService);

app.get('/:shortCode', urlController.redirect.bind(urlController));


app.get('/api/test',(req,res)=>{
    res.status(200).json({message:"ok"});
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}✅`);
});

