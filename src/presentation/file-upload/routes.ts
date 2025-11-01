import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadServices } from '../services/file-upload.services';
import { FileUploadMiddleware, TypeMiddleware } from '../middlewares';

export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController( new FileUploadServices );

    // Aplica el middleware para todas las rutas que se definan
    router.use( FileUploadMiddleware.containFiles );
    router.use( TypeMiddleware.validTypes(['users', 'products', 'categories']) ); // En este punto aún no sabe con exactitud a que ruta esta apuntando

    // Definir las rutas
    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultipleFile  );

    return router;
  }


}

