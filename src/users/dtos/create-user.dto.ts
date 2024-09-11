import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'role must be INTERN OR ENGINEER OR ADMIN'
    })
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}