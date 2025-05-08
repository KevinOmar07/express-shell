import { bcrypAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {

    // DI
    constructor() {}

    public async registerUser(registerDto: RegisterUserDto) {

        const existUser = await UserModel.findOne({ email: registerDto.email });
        if (existUser) throw CustomError.badRequest('Email alredy exist');

        try {

            const user = new UserModel(registerDto);

            user.password = bcrypAdapter.hash(registerDto.password);

            await user.save();

            const { password, ...userEntity } = UserEntity.fromObject(user);

            return { 
                user: userEntity,
                token: 'token'
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest('Invalid email or password');

        const isMatching = bcrypAdapter.compare( loginUserDto.password, user.password);
        if( !isMatching ) throw CustomError.badRequest('Invalid email or password');

        const { password, ...restUser} = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({id: user.id, email: user.email});
        if( !token ) throw CustomError.internalServer('Error while creating jwt')

        return {
            user: restUser,
            token,
        }
    }

}