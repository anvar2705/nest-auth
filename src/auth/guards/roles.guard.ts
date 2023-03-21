import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }
    const user = this.jwtService.verify(token);
    return requiredRoles.some((role) => user.roles?.map((r) => r.name).includes(role));
  }
}
