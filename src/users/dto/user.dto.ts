import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @IsString()
  @MaxLength(30)
  @ApiProperty({
    required: true,
    example: "Luqito Masdar Hilal"
  })
  readonly name: string;

  @IsString()
  @MaxLength(10)
  @ApiProperty({
    required: true,
    example: "player",
    description: "Only can choose between admin or player"
  })
  readonly user_type: string;

  @IsString()
  @MaxLength(40)
  @ApiProperty({
    required: true,
    example: "hilal_02"
  })
  readonly username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "hilal.lucky@gmail.com"
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @ApiProperty({
    required: true,
    example: ")934534534&^^%%__"
  })
  password: string;
}
