import { CategoriaCurso } from "src/categoria-cursos/entities/categoria-curso.entity";
import { Curso } from "src/cursos/entities/curso.entity";
import { Viagem } from "src/viagens/entities/viagem.entity";
import { Equipe } from "src/equipe/entities/equipe.entity";
import { Depoimento } from "src/depoimentos/entities/depoimento.entity";
import { Expedicao } from "src/expedicoes/entities/expedicao.entity";
import { Loja } from "src/loja/entities/loja.entity";
import { Parceiro } from "src/parceiros/entities/parceiro.entity";

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'volume'})
export class Volume {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({name: 'type', type:'varchar'})
    public type:string

    @Column({name: 'url', type:'varchar'})
    public url:string

    @OneToOne(() => Depoimento, (depoimento) => depoimento.volume, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'depoimento_id' })
    public depoimento: Depoimento | null;

    @OneToOne(() => Equipe, (equipe) => equipe.volume, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'equipe_id' })
    public equipe: Equipe | null;

    @ManyToOne(() => Curso, (curso) => curso.id, {nullable: true})
    @JoinColumn({ name: 'curso_volume_teorico' })
    public volumeTeorico: Curso | null;

    @ManyToOne(() => Curso, (curso) => curso.id, {nullable: true})
    @JoinColumn({ name: 'curso_volume_abertas' })
    public volumeAguasAbertas: Curso | null;

    @ManyToOne(() => Curso, (curso) => curso.id, {nullable: true})
    @JoinColumn({ name: 'curso_volume_confinadas' })
    public volumeAguasConfinadas: Curso | null;

    @ManyToOne(() => Curso, (curso) => curso.volume, {nullable: true})
    @JoinColumn({ name: 'curso_id'})
    public curso: Curso | null;

    @ManyToOne(() => CategoriaCurso, (categoria) => categoria.volume, {
        nullable: true, 
        onDelete: 'CASCADE' 
    })
    @JoinColumn({ name: 'categoria_curso_id'})
    public categoriaCurso: CategoriaCurso | null;
    @ManyToOne(() => Viagem, (viagem) => viagem.volume, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'viagem_id' })
    public viagem: Viagem | null;

    @ManyToOne(() => Expedicao, (expedicao) => expedicao.volume, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'expedicao_id' })
    public expedicao: Expedicao | null;

    @ManyToOne(() => Loja, (loja) => loja.galeria, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'loja_id' })
    public loja: Loja | null;

    @ManyToOne(() => Parceiro, (parceiro) => parceiro.logo, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'parceiro_id' })
    public parceiro: Parceiro | null;
}