import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class LeadService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger();
  private url = `https://michaellux2011.amocrm.ru/api/v4/leads`;

  async getRawLeadsData(
    _with: string,
    query: string,
    headers: any,
  ): Promise<any> {
    try {
      this.logger.log(
        'LeadService - getRawLeadsData',
        `Запрос: ${JSON.stringify(query)}`,
      );
      this.logger.log(
        'LeadService',
        `Header authorization: ${JSON.stringify(headers.authorization)}`,
      );

      let fullUrl = `${this.url}?with=${_with}`;
      if (query) {
        fullUrl = fullUrl + `&query=${query}`;
      }
      this.logger.log('LeadService - getRawLeadsData', `Full url: ${fullUrl}`);
      const response = await this.httpService
        .get(fullUrl, {
          headers: {
            authorization: headers.authorization,
          },
        })
        .toPromise();
      /*if (query) {
        //this.logger.log('LeadService', response);
        return response;
      }*/

      return response.data;
    } catch (error) {
      const status = error.response ? error.response.status : HttpStatus;
      const message = error.response
        ? error.response.data
        : 'Internal server error';
      this.logger.log(
        'LeadService - getRawLeadsData - исключение',
        `Message: ${message}, Status: ${status}`,
      );
      throw new HttpException(message, status);
    }
  }

  async getRawPipeLines(headers): Promise<any> {
    try {
      this.logger.log(
        'LeadService',
        `Header authorization: ${JSON.stringify(headers.authorization)}`,
      );
      const response = await this.httpService
        .get(`${this.url}/pipelines`, {
          headers: {
            authorization: headers.authorization,
          },
        })
        .toPromise();
      this.logger.log(
        'LeadService - getRawPipeLines',
        `Response data: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      const status = error.response ? error.response.status : HttpStatus;
      const message = error.response
        ? error.response.data
        : 'Internal server error';
      this.logger.log(
        'LeadService - getRawStatusData - исключение',
        `Message: ${message}, Status: ${status}`,
      );
      throw new HttpException(message, status);
    }
  }

  async getRawStatusData(pipeLineId, statusId, headers): Promise<any> {
    try {
      this.logger.log(
        'LeadService - getRawStatusData',
        `Воронка: ${pipeLineId}`,
      );
      this.logger.log('LeadService - getRawStatusData', `Статус: ${statusId}`);
      this.logger.log(
        'LeadService',
        `Header authorization: ${JSON.stringify(headers.authorization)}`,
      );
      const response = await this.httpService
        .get(`${this.url}/pipelines/${pipeLineId}/statuses/${statusId}`, {
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
      this.logger.log(
        'LeadService - getRawStatusData - исключение',
        `Message: ${message}, Status: ${status}`,
      );
      throw new HttpException(message, status);
    }
  }
}
