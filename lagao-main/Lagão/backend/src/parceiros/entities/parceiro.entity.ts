import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'parceiros'})
export class Parceiro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', type:'varchar'})
    nome: string;

    @Column({name: 'descricao', type:'text', nullable: true})
    descricao: string;

    @Column({name: 'link', type:'varchar', nullable: true})
    link: string; // Ex: Instagram ou Site do parceiro

    @OneToMany(() => Volume, (volume) => volume.parceiro, {eager: true, cascade: true}) 
    logo: Volume[];
}