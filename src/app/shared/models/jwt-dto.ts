export interface JwtDTO {
  token: string;
  type: string;
  nombreUsuario: string;
  authorities: string[];
}
