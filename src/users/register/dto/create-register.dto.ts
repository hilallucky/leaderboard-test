import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

enum UserType { admin = "admin", player = "player" }

export class CreateRegisterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "Luqito Masdar Hilal"
    })
    name: string;

    @IsEnum(UserType)
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "player",
        description: "Only can choose between admin or player"
    })
    user_type: UserType;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "hilal_01"
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "hilal.lucky@gmail.com"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: ")934534534&^^%%__",
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: "admin",
        description: "Based on user login"
    })
    createdBy: string;
}
