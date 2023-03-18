import { ApiProperty } from '@nestjs/swagger';

export class JWT_RESPONSE {
  @ApiProperty()
  accessToken: string;
}
