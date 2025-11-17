import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): unknown => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return req.user;
  },
);
