import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoriaCursoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsOptional()
  urlImagem?: string; // Novo campo para a imagem de capa da categoria
}