import { IsOptional, IsString } from 'class-validator';

export class CreateLojaDto {
    @IsOptional()
    @IsString()
    endereco?: string;

    @IsOptional()
    @IsString()
    linkMapa?: string;

}