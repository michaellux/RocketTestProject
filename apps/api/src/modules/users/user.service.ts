import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger();
  private url = `https://michaellux2011.amocrm.ru/api/v4/users`;

  async getRawUserDataById(id, headers): Promise<any> {
    try {
      this.logger.log('UserService - getRawUserDataById', `Id: ${id}`);
      this.logger.log(
        'UserService',
        `Header authorization: ${JSON.stringify(headers.authorization)}`,
      );
      const fullUrl = `${this.url}/${id}`;
      const response = await this.httpService
        .get(fullUrl, {
          headers: {
            authorization: headers.authorization,
          },
        })
        .toPromise();
      this.logger.log('UserService', `Full url: ${fullUrl}`);
      this.logger.log(
        'UserService',
        `Response data: ${JSON.stringify(response.data)}`,
      );
      return response.data;
    } catch (error) {
      const status = error.response ? error.response.status : HttpStatus;
      const message = error.response
        ? error.response.data
        : 'Internal server error';
      this.logger.log(
        'UserService - getRawUserDataById - исключение',
        `Message: ${message}, Status: ${status}`,
      );
      throw new HttpException(message, status);
    }
  }
}
