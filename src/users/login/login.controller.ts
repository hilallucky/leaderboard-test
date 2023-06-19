import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { UpdateLoginDto } from './dto/update-login.dto';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // @Get(':id')
  // findOne(loginDto: LoginDto) {
  //   return this.loginService.findOne(loginDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
  //   return this.loginService.update(+id, updateLoginDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.loginService.remove(+id);
  // }
}
