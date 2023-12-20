import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger();
  private url = `https://michaellux2011.amocrm.ru/oauth2/access_token`;

  async getAccessToken(data: any): Promise<any> {
    try {
      this.logger.log('AuthService', `Данные: ${JSON.stringify(data)}`);
      const response = await this.httpService.post(this.url, data).toPromise();
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
