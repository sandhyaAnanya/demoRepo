import { Injectable, NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-users.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  //injecting the userRepository
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUser(createUserDto);
    const data = await this.userRepository.createDocument({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    })
    return data
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({})
    console.log("users----------------", users);
    if (!users) {
      throw new NotFoundException("users not found")
    }
    return users
  }

  async getUser(getUser: GetUsersDto) {
    const user = await this.userRepository.findOne(getUser)
    return user
  }

  async deleteUser(_id: string) {

    console.log("---------------<<<<<<<<<<", _id);
    const user = await this.userRepository.findOne({ _id })
    console.log("user---- service", user);
    if (user) {
      await this.userRepository.findoneAndDelete({ _id });
      return {
        status: 200,
        message: `user with the ${_id} is Successfully deleted`
      }
    }
  }

  // this is called in the local-strategy.ts
  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('credentials did not match')
    }
    return user
  }



  private async validateCreateUser(createUser: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUser.email })
    } catch (err) {
      return err
    }
    throw new UnprocessableEntityException('Email already exsists')
  }


}
