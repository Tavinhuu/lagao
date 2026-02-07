import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'equipe'})
export class Equipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'ordem', type: 'int', default: 99}) 
    ordem: number;

    @Column({name: 'nome', type: 'varchar'})
    nome: string;

    @Column({name: 'cargo', type: 'varchar'})
    cargo: string;

    @Column({name: 'descricao', type: 'text'}) // Text para permitir HTML ou textos longos
    descricao: string;

    @OneToOne(() => Volume, (volume) => volume.equipe, {eager: true})
    volume: Volume;
}