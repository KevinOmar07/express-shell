import { regularExps } from "../../../config";
import { CustomError } from "../../errors/custom.error";

export class RegisterUserDto {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ){}

    static create( object: { [key:string]:any }): [string?, RegisterUserDto?]{

        const { name, email, password} = object;

        if( !name ) return ['Missing name'];
        if( !email ) return ['Missing email'];
        if( !regularExps.email.test(email) ) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Missing password'];

        return [undefined, new RegisterUserDto(name, email, password)];
    }

}