import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [HttpModule],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactsModule {}
