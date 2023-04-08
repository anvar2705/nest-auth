import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CODES } from 'common/constants';
import { WithPagination } from 'common/types';

import { CreateRoleDto } from './dto/create-role.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role, 'nest-auth-connection') private roleRepository: Repository<Role>,
  ) {}

  async findAll(params: FindAllQueryDto): Promise<WithPagination<Role>> {
    const { per_page, page } = params;

    if (page) {
      const offset = (page - 1) * per_page;
      const [items, total] = await this.roleRepository.findAndCount({
        take: per_page,
        skip: offset,
      });

      return { total, offset, items };
    }
    const [items, total] = await this.roleRepository.findAndCount();

    return { total, offset: 0, items };
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
