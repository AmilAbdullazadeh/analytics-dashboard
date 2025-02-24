export interface UserToken {
  sub: string;
  email: string;
  roles: string[];
  exp: number;
  name?: string;
  avatar?: string;
}
