import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExpedicaoDto {
    @IsNotEmpty({ message: 'O local é obrigatório' })
    @IsString()
    local: string;

    @IsNotEmpty({ message: 'A descrição é obrigatória' })
    @IsString()
    descricao: string;

    @IsNotEmpty({ message: 'A data de início é obrigatória' })
    @IsDateString({}, { message: 'Data de início inválida' })
    dataInicio: string;

    @IsOptional()
    @IsDateString({}, { message: 'Data de fim inválida' })
    dataFim?: string;

    @IsNotEmpty({ message: 'O valor é obrigatório' })
    @IsString()
    valor: string;

    @IsOptional()
    @IsString()
    linkPagamento?: string;

    @IsOptional()
    @IsString()
    urlImagem?: string;
}