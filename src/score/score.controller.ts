import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('score')
@UseGuards(AuthGuard)
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) { }

  @Get('profile')
  getUserId(@Request() req: any) {
    return req.user;
  }

  @Post()
  create(
    @Request() request: any,
    @Req() req: Request,
    @Body() createScoreDto: CreateScoreDto
  ) {
    return this.scoreService.create(
      createScoreDto,
      request.user,
      req
    );
  }

  @Get()
  findAll(@Request() req: any, player_id: number) {
    return this.scoreService.findAll(player_id, req.user);
  }
}
