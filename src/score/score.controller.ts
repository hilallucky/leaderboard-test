import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Req, Query } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

class pid {
  @ApiProperty({
    type: 'number',
    name: 'player_id',
    description: 'player_id'
  })
  pid: number
}

@ApiTags('score')
@ApiBearerAuth()
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
  findAll(@Request() req: any, @Query('player_id') player_id: pid) {
    return this.scoreService.findAll(Number(player_id), req.user);
  }
}
