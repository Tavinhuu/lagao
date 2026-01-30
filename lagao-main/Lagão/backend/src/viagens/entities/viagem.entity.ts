import { Agenda } from "src/agenda/entities/agenda.entity";
import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'viagem'})
export class Viagem {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({name: 'nome', type:'varchar'})
    public nome:string
    
    @Column({name: 'descricao', type:'varchar'})
    public descricao:string

    @Column({name: 'destino', type:'varchar'})
    public destino:string

    @Column({name:'inicio_viagem', type: 'timestamptz' })
    public inicioViagem: Date;

    @Column({name:'fim_viagem', type: 'timestamptz' })
    public fimViagem: Date;

    @OneToMany(() => Agenda, (agenda) => agenda.id)
    agendas: number[] | Agenda[];

    @OneToMany(() => Volume, (volume) => volume.id, {eager:true})
    volume:Volume[];
}
