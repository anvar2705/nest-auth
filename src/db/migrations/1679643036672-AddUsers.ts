/* eslint-disable no-await-in-loop */
import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from 'models/roles/entity/role.entity';
import { User } from 'models/users/entity/user.entity';

const USERS = new Array(100).fill(1).map((item, i) => `user-${i + 1}`);

export class AddUsers1679643036672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultPassword = await bcrypt.hash('123456789', 5);

    const userRole = await queryRunner.manager.findOneBy(Role, { name: 'USER' });

    if (userRole) {
      // eslint-disable-next-line no-restricted-syntax
      for (const user of USERS) {
        const existingUser = await queryRunner.manager.findOneBy(User, { username: user });
        if (!existingUser) {
          const createdUser = queryRunner.manager.create(User, {
            username: user,
            password: defaultPassword,
            roles: [userRole],
          });

          await queryRunner.manager.save(createdUser);
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const user of USERS) {
      const removedUser = await queryRunner.manager.findOneBy(User, { username: user });
      if (removedUser) await queryRunner.manager.remove(User, removedUser);
    }
  }
}
