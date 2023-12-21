import { LeadService } from './lead.service';
import { Controller, Get, Query, Headers, Logger } from '@nestjs/common';
@Controller('api/leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}
  private readonly logger = new Logger();
  @Get()
  async index(
    @Query('filter') filter: string,
    @Headers() headers: any,
  ): Promise<any> {
    this.logger.log('LeadController', `Фильтр: ${JSON.stringify(headers)}`);
    const response = this.leadService.getRawLeadsData(filter, headers);
    this.logger.log('LeadController', `Response: ${response}`);
    return response;
  }
}
