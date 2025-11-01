
import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';

export class ImagesController {

    // DI
    constructor(){}

    getImages = ( req: Request, res: Response) => {

        const { type = '', image = '' } = req.params;
        const imagePath = path.resolve( __dirname, `../../../uploads/${type}/${image}`);

        if ( !fs.existsSync( imagePath ))
            return res.status(400).send('Image not found');

        return res.sendFile( imagePath );

    }
}