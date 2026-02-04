import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'configuracoes' })
export class Config {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    manutencao: boolean;
}