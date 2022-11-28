import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  async findAll() {
    return 'findAll'
  }

  findOne(id: number) {
    return 'findOne'
  }

  create(id: number, dto: CreateUserDto) {
    console.log(id)
    return 'create'
  }

  remove(id: number) {
    return 'remove'
  }
}
