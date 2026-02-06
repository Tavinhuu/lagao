import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'loja'})
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'endereco', type:'text', nullable: true})
    endereco: string;

    @Column({name: 'link_mapa', type:'text', nullable: true})
    linkMapa: string; // Para o iframe do Google Maps

    @OneToMany(() => Volume, (volume) => volume.loja, {eager: true, cascade: true}) 
    galeria: Volume[];
}