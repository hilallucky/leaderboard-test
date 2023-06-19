import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from './auth.guard';
import { LoginDto } from 'src/users/login/dto/login.dto';
import { LoginService } from 'src/users/login/login.service';
import { RegisterService } from 'src/users/register/register.service';
import { CreateRegisterDto } from 'src/users/register/dto/create-register.dto';
import { Logger } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private registerService: RegisterService
  ) { }

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // async signIn(@Body() signInDto: Record<string, any>) {
  //   const token = await this.authService.signIn(signInDto.username, signInDto.password)
  //   return token;
  // }

  @Public()
  // @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() createRegisterDto: CreateRegisterDto,
    @Req() req: Request,
  ) {
    return this.registerService.create(createRegisterDto, req);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login_user')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ) {
    const token = await this.loginService.login(loginDto, req);
    return token;
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('check')
  async checkIn(@Request() req) {
    Logger.log(`Url for OpenApi: auth/check`, 'check profile');
    return req.user;
  }

  @Get('profile')
  getProfile(@Request() req) {
    Logger.log(`Url for OpenApi: auth/profile`, 'check profile');

    return req.user;
  }
}
