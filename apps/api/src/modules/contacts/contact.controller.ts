import { ContactService } from './Contact.service';
import { Controller, Get, Param, Headers, Logger } from '@nestjs/common';
@Controller('api/contacts')
export class ContactController {
  constructor(private readonly leadService: ContactService) {}
  private readonly logger = new Logger();

  @Get(':id')
  async getContactById(
    @Param('id') id: string,
    @Headers() headers: any,
  ): Promise<any> {
    const response = this.leadService.getRawContactDataById(id, headers);
    this.logger.log(
      'ContactController - getRawContactDataById',
      `Response: ${response}`,
    );
    return response;
  }
}
