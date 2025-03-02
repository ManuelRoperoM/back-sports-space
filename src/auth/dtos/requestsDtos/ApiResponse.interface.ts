import { UserJwtDto } from './UserJwt.dto';

export interface ApiResponse {
  status: number;
  data?: UserJwtDto;
  msge?: string;
}
