import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateParceiroDto {
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    @IsString()
    urlLogo?: string;
}