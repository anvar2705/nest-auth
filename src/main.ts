import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { ValidationPipe } from './common/validations'
import { RolesService } from './models/roles/roles.service'
import { UsersService } from './models/users/users.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('NEST-AUTH')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(5000).then(() => console.log('The app started on 5000 port'))

  // Create initial roles, users
  const rolesService = app.get(RolesService)
  await rolesService._createInitialRoles()

  const usersService = app.get(UsersService)
  await usersService._createAdmin()
}

bootstrap()
