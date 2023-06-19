import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateScoreDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 1
    })
    player_id: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        example: 200
    })
    score: number;
}
