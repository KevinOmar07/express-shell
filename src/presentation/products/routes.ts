import { Router } from 'express';
import { AuthMiddlwere } from '../middlewares/auth.middleware';
import { ProductController } from './controller';
import { ProductService } from '../services/product.services';



export class ProductRoutes {

  static get routes(): Router {

    const router = Router();
    const productService = new ProductService()
    const controller = new ProductController(productService);

    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', [ AuthMiddlwere.validateJWT ], controller.createProduct );

    return router;
  }


}

