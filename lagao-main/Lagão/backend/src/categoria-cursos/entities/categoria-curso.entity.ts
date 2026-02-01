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

    // CORREÇÃO AQUI: Mudamos de (v)=>v.id para (v)=>v.categoriaCurso
    @OneToOne(() => Volume, (volume) => volume.categoriaCurso, {eager:true})
    @JoinColumn({ name: 'volume_id' })
    volume: number | Volume;

    // REMOVI O 'eager:true' AQUI PARA EVITAR LOOPS E MELHORAR PERFORMANCE (COMO DISCUTIMOS ANTES)
    @OneToMany(() => Curso, (curso) => curso.categoriaCurso)
    cursos: number[] | Curso[];
}