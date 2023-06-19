import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateScoreDto {
    @IsNumber()
    @IsNotEmpty()
    player_id: number;
    
    @IsNumber()
    @IsNotEmpty()
    score: number;
}
