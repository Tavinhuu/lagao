import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'depoimentos'})
export class Depoimento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome', type: 'varchar'})
    nome: string;

    @Column({name: 'titulo', type: 'varchar'})
    titulo: string;

    @Column({name: 'texto', type: 'text'})
    texto: string;

    @Column({name: 'local', type: 'varchar'})
    local: string;

    @Column({name: 'rating', type: 'int'})
    rating: number; // 1 a 5

    @Column({name: 'data', type: 'date', default: 'NOW()'})
    data: Date;

    // Relação com a foto do usuário (Avatar)
    @OneToOne(() => Volume, (volume) => volume.depoimento, {eager: true})
    volume: Volume;
}