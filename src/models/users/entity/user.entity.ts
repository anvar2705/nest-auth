import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'Users' })
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string

  @ApiProperty({ example: 'abcd12345', description: 'Пароль' })
  @Column({ type: 'varchar', nullable: false })
  password: string

  @ApiProperty({ example: '2022-11-30T11:57:56.572Z', description: 'Время создания' })
  @CreateDateColumn()
  public created_at: Date

  @ApiProperty({ example: '2022-11-30T11:57:56.572Z', description: 'Время обновления' })
  @UpdateDateColumn()
  public updated_at: Date
}
