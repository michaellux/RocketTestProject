import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ContactService } from './Contact.service';
import { ContactController } from './Contact.controller';

@Module({
  imports: [HttpModule],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactsModule {}