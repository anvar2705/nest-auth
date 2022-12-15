import { Injectable } from '@nestjs/common'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'
import { Role } from './entity/role.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role, 'nest-auth-connection') private roleRepository: Repository<Role>
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find()
  }

  async findByName(name: string): Promise<Role> {
    return await this.roleRepository.findOneBy({ name })
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(dto)
    return this.roleRepository.save(role)
  }

  async update(id: number, dto: CreateRoleDto): Promise<UpdateResult> {
    return await this.roleRepository.update(id, { ...dto })
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.roleRepository.delete(id)
  }
}
