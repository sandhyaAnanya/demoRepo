import { Body, Controller, Delete, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@app/common';
import { UserDocument } from './model/users.schema';
import { JwtAuthGaurd } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }


    @UseGuards(JwtAuthGaurd)
    @Get('allUsers')
    getAllUsers(){
        return  this.usersService.getAllUsers()
    }

    //gets the details of  current user, who has logged in
    @Get('currentUser')
    @UseGuards(JwtAuthGaurd)
    getCurrentUser(
        @CurrentUser() user:UserDocument
    ){
        return user 
    }

    @UseGuards(JwtAuthGaurd)
    @Delete('deleteAccount/:id')
    deleteAccount(
        @Param('id') id:string
    ){
        console.log("id------------>",id);
        return this.usersService.deleteUser(id)
    }
    
}
