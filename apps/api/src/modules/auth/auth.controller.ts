import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async index(@Body() data: any): Promise<any> {
    return this.authService.getAccessToken(data);
  }
}
