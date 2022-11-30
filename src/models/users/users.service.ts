import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entity/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'nest-auth-connection') private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id })
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.userRepository.save(dto)
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id)
  }

  async update(id: number, dto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update(id, { ...dto })
  }
}
