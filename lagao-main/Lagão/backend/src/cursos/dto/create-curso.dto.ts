import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsOptional()
  urlImagem?: string;

  @IsString()
  @IsOptional()
  descricaoTeorico?: string;

  @IsString()
  @IsOptional()
  descricaoAguasConfinadas?: string;

  @IsString()
  @IsOptional()
  descricaoAguasAbertas?: string;

  // Recebemos apenas o ID da categoria vindo do formulário
  @IsNumber()
  @IsOptional()
  categoriaCurso?: number; 
}