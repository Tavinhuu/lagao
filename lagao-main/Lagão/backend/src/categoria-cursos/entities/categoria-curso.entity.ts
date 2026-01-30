import { Curso } from "src/cursos/entities/curso.entity";
import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categoria-cursos'})
export class CategoriaCurso {
    @PrimaryGeneratedColumn()
    id:number
    @Column({name: 'nome', type:'varchar'})
    public nome:string
    
    @Column({name: 'descricao', type:'varchar'})
    public descricao:string

    @OneToOne(() => Volume, (volume) => volume.id, {eager:true})
    @JoinColumn({ name: 'volume_id' })
    volume: number | Volume;

    @OneToMany(() => Curso, (curso) => curso.categoriaCurso, {eager:true})
    cursos: number[] | Curso[];
    
}
