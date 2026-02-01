import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgendaDto {
  @IsDateString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  titulo: string; // Título agora é obrigatório

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  local?: string;

  // Mantemos opcionais caso um dia queira usar
  @IsNumber()
  @IsOptional()
  cursoId?: number;

  @IsNumber()
  @IsOptional()
  viagemId?: number;
}