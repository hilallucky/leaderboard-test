import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "src/users/dto/user.dto";

// export class LoginDto extends PickType(
//     UserDto, [
//         'email',
//         'password',
//     ] as const) { }

export class LoginDto {
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
        example: ")934534534&^^%%__"
    })
    password: string;
}