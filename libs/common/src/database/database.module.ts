import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {ModelDefinition, MongooseModule} from '@nestjs/mongoose'
@Module({
    imports:[MongooseModule.forRootAsync({
        useFactory:(configService:ConfigService) => ({
            uri:configService.get('MONGO_URI')
        }),
        inject:[ConfigService]
    })]
})
export class DatabaseModule {
    // to let know mongoose about the model we have to define this static method 
    static forFeature(models: ModelDefinition[]){
       return MongooseModule.forFeature(models)
    }
}
