import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class LeadService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger();
  private url = `https://michaellux2011.amocrm.ru/api/v4/leads`;

  async getRawLeadsData(filter: string, headers: any): Promise<any> {
    try {
      this.logger.log('LeadService', `Фильтр: ${JSON.stringify(filter)}`);
      this.logger.log(
        'LeadService',
        `Header authorization: ${JSON.stringify(headers.authorization)}`,
      );
      const response = await this.httpService
        .get(this.url, {
          headers: {
            authorization: headers.authorization,
          },
        })
        .toPromise();
      this.logger.log(
        'LeadService',
        `Response data: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      const status = error.response ? error.response.status : HttpStatus;
      const message = error.response
        ? error.response.data
        : 'Internal server error';
      throw new HttpException(message, status);
    }
  }
}
