import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiKeyService } from '../api-key/api-key.service';

export interface RequestWithAuth extends Request {
  user?: any;
  apiKey?: any;
}

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAuth>();

    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader || Array.isArray(authHeader)) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const validated = await this.apiKeyService.validateApiKey(token);
    if (!validated) {
      throw new UnauthorizedException('Invalid API key');
    }

    request.user = validated.user;
    request.apiKey = validated.apiKey;

    return true;
  }
}
