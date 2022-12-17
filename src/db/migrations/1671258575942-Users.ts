import { MigrationInterface, QueryRunner } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Role } from 'models/roles/entity/role.entity'
import { User } from 'models/users/entity/user.entity'

export class Users1671258575942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultPassword = await bcrypt.hash('123456789', 5)

    const adminRole = await queryRunner.manager.findOneBy(Role, { name: 'ADMIN' })

    if (adminRole) {
      const admin = queryRunner.manager.create(User, {
        username: 'admin',
        password: defaultPassword,
        roles: [adminRole],
      })
      await queryRunner.manager.save(admin)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const admin = await queryRunner.manager.findOneBy(User, { username: 'admin' })
    if (admin) await queryRunner.manager.remove(User, admin)
  }
}
