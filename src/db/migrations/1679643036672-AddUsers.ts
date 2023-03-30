import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { Role } from 'models/roles/entity/role.entity';
import { User } from 'models/users/entity/user.entity';

const users = new Array(100).fill(1).map((item, i) => `user-${i + 1}`);

export class AddUsers1679643036672 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultPassword = await bcrypt.hash('123456789', 5);

    const adminRole = await queryRunner.manager.findOneBy(Role, { name: 'ADMIN' });

    if (adminRole) {
      const admin = queryRunner.manager.create(User, {
        username: 'anvar',
        password: defaultPassword,
        roles: [adminRole],
      });
      await queryRunner.manager.save(admin);
    }

    const userRole = await queryRunner.manager.findOneBy(Role, { name: 'USER' });

    if (userRole) {
      // eslint-disable-next-line no-restricted-syntax
      for (const user of users) {
        const createdUser = queryRunner.manager.create(User, {
          username: user,
          password: defaultPassword,
          roles: [userRole],
        });
          // eslint-disable-next-line no-await-in-loop
        await queryRunner.manager.save(createdUser);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const anvar = await queryRunner.manager.findOneBy(User, { username: 'anvar' });
    if (anvar) await queryRunner.manager.remove(User, anvar);

    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-await-in-loop
      const removedUser = await queryRunner.manager.findOneBy(User, { username: user });
      // eslint-disable-next-line no-await-in-loop
      if (removedUser) await queryRunner.manager.remove(User, removedUser);
    }
  }
}
