import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { User } from 'models/users/entity/user.entity'

@Entity()
export class Role {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}
