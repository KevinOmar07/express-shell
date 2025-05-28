import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddlwere } from '../middlewares/auth.middleware';
import { CategoryService } from '../services';



export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    const service = new CategoryService()
    const controller = new CategoryController(service)

    // Definir las rutas
    router.get('/', controller.getCategories );
    router.post('/', [ AuthMiddlwere.validateJWT ], controller.createCategory );

    return router;
  }


}

