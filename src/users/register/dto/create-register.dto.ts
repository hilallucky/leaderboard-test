import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum UserType { admin = "admin", player = "player" }

export class CreateRegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(UserType)
    @IsNotEmpty()
    user_type: UserType;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    createdBy: string;
}
