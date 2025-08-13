import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { validateRequest } from "../middlewares/validate.middleware";
import { LoginDto } from "../dto/request/login.dto";
import { SignupDto } from "../dto/request/signup.dto";
import { GoogleAuthDto } from "../dto/request/google-auth.dto"

const authService = new AuthService()
const authController = new AuthController(authService);

const router = Router();

router.post("/login", validateRequest(LoginDto), authController.login.bind(authController));
router.post("/signup", validateRequest(SignupDto), authController.signup.bind(authController));
router.post("/google/callback", validateRequest(GoogleAuthDto), authController.googleAuthCallback.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export default router;