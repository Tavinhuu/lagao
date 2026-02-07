import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomePageDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsOptional()
    subTitulo: string;

    @IsString()
    @IsOptional()
    textoBotao: string;

    @IsString()
    @IsNotEmpty()
    url: string; // URL da imagem
}