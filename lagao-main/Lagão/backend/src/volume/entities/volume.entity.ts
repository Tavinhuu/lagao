import { CategoriaCurso } from "src/categoria-cursos/entities/categoria-curso.entity";
import { Curso } from "src/cursos/entities/curso.entity";
import { Viagem } from "src/viagens/entities/viagem.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'volume'})
export class Volume {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({name: 'type', type:'varchar'})
    public type:string

    @Column({name: 'url', type:'varchar'})
    public url:string

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

    // AQUI ESTAVA O PROBLEMA DO DELETE:
    // Adicionamos onDelete: 'CASCADE' para liberar a exclusão
    @ManyToOne(() => CategoriaCurso, (categoria) => categoria.volume, {
        nullable: true, 
        onDelete: 'CASCADE' 
    })
    @JoinColumn({ name: 'categoria_curso_id'})
    public categoriaCurso: CategoriaCurso | null;

    @ManyToOne(() => Viagem, (viagem) => viagem.volume, {nullable: true})
    @JoinColumn({ name: 'viagem_id' })
    public viagem: Viagem | null;
}