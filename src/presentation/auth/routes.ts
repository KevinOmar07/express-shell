import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.services';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const authService = new AuthService();
        const controller = new AuthController(authService);
        
        // Definir las rutas
        router.use('/login',  controller.loginUser );
        router.use('/register', controller.registerUser );

        router.use('/validate-email/:token', controller.validateUser );

        return router;
    }

}

