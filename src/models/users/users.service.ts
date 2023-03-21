import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { DeleteResult, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'nest-auth-connection') private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async _getUserWithPassword(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        roles: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<any> {
    const { roles, ...dtoWithoutRoles } = dto;

    const sameUsernameUser = await this.findByUsername(dto.username);
    if (sameUsernameUser) {
      throw new HttpException('Пользователь с таким username существует', HttpStatus.BAD_REQUEST);
    }

    if (dto.email) {
      const sameEmailUser = await this.findByEmail(dto.email);
      if (sameEmailUser) {
        throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
      }
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = this.userRepository.create({ ...dtoWithoutRoles, password: hashPassword });
    user.roles = [];

    if (!roles) {
      const userRole = await this.roleService.findByName('USER');
      if (userRole) {
        user.roles = [userRole];
      }
    } else if (roles.length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const roleName of roles) {
        // eslint-disable-next-line no-await-in-loop
        const role = await this.roleService.findByName(roleName);
        if (role) {
          user.roles.push(role);
        }
      }
    }

    const { password, ...savedUser } = await this.userRepository.save(user);
    return savedUser;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const { roles, ...dtoWithoutRoles } = dto;

    const hashPassword = dto.password ? await bcrypt.hash(dto.password, 5) : undefined;

    await this.userRepository.update(id, {
      ...dtoWithoutRoles,
      password: hashPassword,
    });

    const user = await this.findById(id);

    if (roles) {
      user.roles = [];

      if (roles.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const roleName of roles) {
          // eslint-disable-next-line no-await-in-loop
          const role = await this.roleService.findByName(roleName);
          if (role) {
            user.roles.push(role);
          }
        }
      }

      return this.userRepository.save(user);
    }

    return user;
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async addRole(id: number, roleDto: CreateRoleDto) {
    const user = await this.findById(id);
    const role = await this.roleService.findByName(roleDto.name);

    if (user && role) {
      if (user.roles.findIndex((currentRole) => currentRole.id === role.id) === -1) {
        user.roles = [...user.roles, role];
        return this.userRepository.save(user);
      }
      throw new HttpException('Данная роль уже присвоена пользователю', HttpStatus.FORBIDDEN);
    }

    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async removeRole(id: number, roleDto: CreateRoleDto) {
    const user = await this.findById(id);
    const role = await this.roleService.findByName(roleDto.name);

    if (user && role) {
      if (user.roles.findIndex((currentRole) => currentRole.id === role.id) !== -1) {
        user.roles = user.roles.filter((currentRole) => currentRole.id !== role.id);
        return this.userRepository.save(user);
      }
      throw new HttpException('Данная роль не присвоена пользователю', HttpStatus.FORBIDDEN);
    }

    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }
}
