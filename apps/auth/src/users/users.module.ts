import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UserDocument, UserSchema } from './model/users.schema';
import { UserRepository } from './users.repository';

@Module({
  imports:[
    //Inorder to instantiate and make use of any repository and database connection we have import the databaseModule
    //and setup the userSchema access the database
    DatabaseModule,
    DatabaseModule.forFeature([{name:UserDocument.name,schema:UserSchema}]),
    LoggerModule
  ],
  controllers: [UsersController],
  providers: [UsersService,UserRepository],
  exports:[UsersService,UserRepository]
})
export class UsersModule {}
