import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { Role } from '../../roles/entity/role.entity';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
    id: number;

  @ApiProperty({ example: 'username', description: 'Ник пользователя' })
  @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @Column({ type: 'varchar', nullable: true, unique: true })
    email: string;

  @ApiProperty({ example: 'abcd12345', description: 'Пароль' })
  @Column({ type: 'varchar', nullable: false, select: false })
    password: string;

  @ApiProperty({ example: '2022-11-30T11:57:56.572Z', description: 'Время создания' })
  @CreateDateColumn()
  public created_at: Date;

  @ApiProperty({ example: '2022-11-30T11:57:56.572Z', description: 'Время обновления' })
  @UpdateDateColumn()
  public updated_at: Date;

  @ApiProperty({ example: [{ id: 0, name: 'USER' }], description: 'Роли пользователя' })
  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable()
    roles: Role[];
}
