import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateViagenDto {
  @IsString()
  @IsNotEmpty()
  destino: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsDateString()
  @IsNotEmpty()
  inicioViagem: string;

  @IsDateString()
  @IsNotEmpty()
  fimViagem: string;

  @IsString()
  @IsOptional()
  urlImagem?: string;
}