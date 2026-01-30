import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaCursoDto } from './create-categoria-curso.dto';

export class UpdateCategoriaCursoDto extends PartialType(CreateCategoriaCursoDto) {}
