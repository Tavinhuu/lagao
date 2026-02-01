import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsDateString } from 'class-validator';

export class CreateDepoimentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  texto: string;

  @IsString()
  @IsNotEmpty()
  local: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsDateString()
  @IsOptional()
  data?: string;

  @IsString()
  @IsOptional()
  urlImagem?: string; // Foto do avatar
}