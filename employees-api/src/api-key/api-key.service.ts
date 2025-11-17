import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ApiKeyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async validateApiKey(key: string) {
    const apiKey = await this.databaseService.apiKey.findFirst({
      where: {
        key,
        revoked: false,
      },
      include: {
        user: true,
      },
    });
    if (!apiKey || !apiKey.user) {
      return null;
    }
    const { user, ...apiKeyWithoutUser } = apiKey;
    return {
      apiKey: apiKeyWithoutUser,
      user,
    };
  }
}
