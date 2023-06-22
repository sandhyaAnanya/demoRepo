import { AbstractRepository } from "@app/common";
import { UserDocument } from "./model/users.schema";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class UserRepository extends AbstractRepository<UserDocument>{
    protected readonly logger = new Logger(UserRepository.name);
    constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
        super(userModel);
    }
    
}