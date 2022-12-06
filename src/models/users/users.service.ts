import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entity/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateRoleDto } from '../roles/dto/create-role.dto'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'nest-auth-connection') private userRepository: Repository<User>,
    private roleService: RolesService
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username })
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  async create(dto: CreateUserDto): Promise<any> {
    const { roles, ...restDto } = dto
    const user = this.userRepository.create(restDto)
    user.roles = []

    if (roles && roles.length > 0) {
      for (const roleName of roles) {
        const role = await this.roleService.findByName(roleName)
        if (role) {
          user.roles.push(role)
        }
      }
    } else {
      const userRole = await this.roleService.findByName('USER')
      if (userRole) {
        user.roles = [userRole]
      }
    }

    return await this.userRepository.save(user)
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const { roles, ...restDto } = dto

    await this.userRepository.update(id, {
      ...restDto,
    })

    const user = await this.findById(id)

    if (roles) {
      user.roles = []

      if (roles.length > 0) {
        for (const roleName of roles) {
          const role = await this.roleService.findByName(roleName)
          if (role) {
            user.roles.push(role)
          }
        }
      }

      return await this.userRepository.save(user)
    }

    return user
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id)
  }

  async addRole(id: number, roleDto: CreateRoleDto) {
    const user = await this.findById(id)
    const role = await this.roleService.findByName(roleDto.name)

    if (user && role) {
      if (user.roles.findIndex((currentRole) => currentRole.id === role.id) === -1) {
        user.roles = [...user.roles, role]
        return await this.userRepository.save(user)
      }
      throw new HttpException('Данная роль уже присвоена пользователю', HttpStatus.FORBIDDEN)
    }

    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async removeRole(id: number, roleDto: CreateRoleDto) {
    const user = await this.findById(id)
    const role = await this.roleService.findByName(roleDto.name)

    if (user && role) {
      if (user.roles.findIndex((currentRole) => currentRole.id === role.id) !== -1) {
        user.roles = user.roles.filter((currentRole) => currentRole.id !== role.id)
        return await this.userRepository.save(user)
      }
      throw new HttpException('Данная роль не присвоена пользователю', HttpStatus.FORBIDDEN)
    }

    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }
}
