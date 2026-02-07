import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'home_page' })
export class HomePage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'titulo', type: 'varchar', nullable: true })
    titulo: string;

    @Column({ name: 'sub_titulo', type: 'varchar', nullable: true })
    subTitulo: string;

    @Column({ name: 'texto_botao', type: 'varchar', nullable: true })
    textoBotao: string;

    @OneToOne(() => Volume, { cascade: true, eager: true })
    @JoinColumn({ name: 'volume_id' })
    volume: Volume;
}