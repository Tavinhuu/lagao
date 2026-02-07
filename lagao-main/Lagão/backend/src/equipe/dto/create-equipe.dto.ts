import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  ordem?: number;
}