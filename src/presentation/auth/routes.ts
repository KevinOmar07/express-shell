import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const controller = new AuthController();
        
        // Definir las rutas
        router.use('/login',  controller.loginUser );
        router.use('/register', controller.registerUser );

        router.use('/validate-email/:token', controller.validateUser );

        return router;
    }

}

