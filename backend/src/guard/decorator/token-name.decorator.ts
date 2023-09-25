import { SetMetadata } from '@nestjs/common';

export const TOKEN_NAME = 'TOKEN_NAME';
export const TokenName = (name: string) => SetMetadata(TOKEN_NAME, name);
