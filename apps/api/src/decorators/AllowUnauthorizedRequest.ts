import { SetMetadata } from '@nestjs/common';

export const IS_UNAUTHORIZED_KEY = 'allowUnauthorizedRequest';

export const AllowUnauthorizedRequest = () =>
  SetMetadata(IS_UNAUTHORIZED_KEY, true);
