import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEquipeDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsOptional()
  urlImagem?: string;
}