import { LeadService } from './lead.service';
import { Controller, Get, Query, Param, Headers, Logger } from '@nestjs/common';
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

  @Get('/pipelines/:pipeLineId/statuses/:statusId') // Новый маршрут для получения статуса по id
  async getStatusById(
    @Param('pipeLineId') pipeLineId: string,
    @Param('statusId') statusId: string,
    @Headers() headers: any,
  ): Promise<any> {
    const response = this.leadService.getRawStatusData(
      pipeLineId,
      statusId,
      headers,
    );
    this.logger.log('LeadController - getStatusById', `Response: ${response}`);
    return response;
  }
}
