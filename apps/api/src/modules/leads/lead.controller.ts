import {
  Controller,
  Get
} from '@nestjs/common';

@Controller('api/leads')
export class LeadsController {
  constructor() {}

  @Get()
  async index(): Promise<string> {
    return "test";
  }
}