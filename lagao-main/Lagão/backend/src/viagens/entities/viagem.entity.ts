import { Agenda } from "src/agenda/entities/agenda.entity"; // <--- Importante importar
import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'viagens'})
export class Viagem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'destino', type:'varchar'})
    public destino: string;

    @Column({name: 'descricao', type:'varchar'})
    public descricao: string;

    @Column({name: 'inicio_viagem', type:'date'})
    public inicioViagem: Date;

    @Column({name: 'fim_viagem', type:'date'})
    public fimViagem: Date;

    @OneToMany(() => Agenda, (agenda) => agenda.viagem)
    agendas: Agenda[];

    @OneToMany(() => Volume, (volume) => volume.viagem, {eager: true}) 
    volume: Volume[];
}