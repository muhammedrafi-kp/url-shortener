import { Router } from "express";
import { UrlController } from "../controllers/url.controller";
import { UrlService } from "../services/url.service";
import { validateToken } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validate.middleware";
import { UrlDto } from "../dto/request/create-url.dto";

const urlService = new UrlService()
const urlController = new UrlController(urlService);

const router = Router();

router.post('/', validateToken, validateRequest(UrlDto), urlController.createShortURL.bind(urlController));
router.get('/user/list',validateToken, urlController.listUserURLs.bind(urlController));

export default router;