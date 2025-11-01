import { Request, response, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadServices } from "../services/file-upload.services";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {

    // DI
    constructor(
        private readonly fileUploadService: FileUploadServices
    ){}

    private handleError = (error: any, res: Response) => {

        if(error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
        
        console.log(`${error}`);
        return res.status(500).json({error: 'Internal server error'});
    }

    uploadFile = ( req: Request, res: Response) => {

        const type = req.params.type;
        const file = req.body.files.at(0) as UploadedFile;

        this.fileUploadService.uploadSingle( file, `uploads/${ type }` )
            .then( uploaded => res.json(uploaded) )
            .catch( error => this.handleError( error, res ) );

    }

    uploadMultipleFile = ( req: Request, res: Response) => {

        const type = req.params.type;
        const files = req.body.files as UploadedFile[];

        this.fileUploadService.uploadMultiple( files, `uploads/${ type }` )
            .then( uploaded => res.json(uploaded) )
            .catch( error => this.handleError( error, res ) )

    }

    
}