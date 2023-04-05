import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CODES } from 'common/constants';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role, 'nest-auth-connection') private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const sameNameRole = await this.roleRepository.findOneBy({ name: dto.name });
    if (sameNameRole) {
      throw new HttpException(
        { message: 'Данная роль уже существует', code: CODES.ROLE_SAME_ROLE_EXISTS },
        HttpStatus.BAD_REQUEST,
      );
    }
    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async update(id: number, dto: CreateRoleDto): Promise<UpdateResult> {
    return this.roleRepository.update(id, { ...dto });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
}
