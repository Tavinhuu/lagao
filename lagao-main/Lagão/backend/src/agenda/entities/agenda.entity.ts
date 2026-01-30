import { Curso } from "src/cursos/entities/curso.entity";
import { Viagem } from "src/viagens/entities/viagem.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'agenda'})
export class Agenda {
    @PrimaryGeneratedColumn()
    id:number

    @Column({name:'data', type: 'timestamptz' })
    public data: Date;

    @ManyToOne(()=> Curso, (curso) => curso.agendas, {eager:true, nullable: true})
    @JoinColumn({name: 'curso_id'})
    curso: null | Curso | number;

    @ManyToOne(()=> Viagem, (viagem) => viagem.agendas, {eager:true, nullable: true})
    @JoinColumn({name: 'viagem_id'})
    viagem: null | Viagem | number;
}
