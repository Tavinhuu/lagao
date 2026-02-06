import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'expedicoes'})
export class Expedicao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'local', type:'varchar'})
    local: string;

    @Column({name: 'descricao', type:'varchar', nullable: true})
    descricao: string;

    @Column({name: 'data_inicio', type:'date'})
    dataInicio: Date;

    @Column({name: 'data_fim', type:'date', nullable: true})
    dataFim: Date;

    @Column({name: 'valor', type:'varchar', nullable: true})
    valor: string; // Ex: "R$ 1.500,00"

    @Column({name: 'link_pagamento', type:'varchar', nullable: true})
    linkPagamento: string; // Opcional: botão para comprar

    @OneToMany(() => Volume, (volume) => volume.expedicao, {eager: true}) 
    volume: Volume[];
}