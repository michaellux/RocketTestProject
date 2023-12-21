import { UserService } from './user.service';
import { Controller, Get, Param, Headers, Logger } from '@nestjs/common';
@Controller('api/users')
export class UserController {
  constructor(private readonly leadService: UserService) {}
  private readonly logger = new Logger();

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Headers() headers: any,
  ): Promise<any> {
    const response = this.leadService.getRawUserDataById(id, headers);
    this.logger.log(
      'UserController - getRawUserDataById',
      `Response: ${response}`,
    );
    return response;
  }
}
