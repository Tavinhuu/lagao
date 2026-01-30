import { Agenda } from "src/agenda/entities/agenda.entity";
import { CategoriaCurso } from "src/categoria-cursos/entities/categoria-curso.entity";
import { Volume } from "src/volume/entities/volume.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'curso'})
export class Curso {
    @PrimaryGeneratedColumn()
    id:number
    @Column({name: 'nome', type:'varchar'})
    public nome:string
    
    @Column({name: 'descricao', type:'varchar'})
    public descricao:string

    @Column({name: 'descricao_teorico', type:'varchar', nullable:true})
    public descricaoTeorico: string;

    @Column({name: 'descricao_aguas_confinadas', type:'varchar', nullable:true})
    public descricaoAguasConfinadas: string;

    @Column({name: 'descricao_aguas_abertas', type:'varchar', nullable:true})
    public descricaoAguasAbertas: string;

    @OneToMany(() => Agenda, (agenda) => agenda.id)
    agendas: number[] | Agenda[];

    @OneToMany(() => Volume, (volume) => volume.curso, {eager:true})
    volume:Volume[];

    @OneToMany(() => Volume, (volume) => volume.volumeTeorico, {eager:true})
    volumeTeorico:Volume[];

    @OneToMany(() => Volume, (volume) => volume.volumeAguasAbertas, {eager:true})
    volumeAguasAbertas:Volume[];

    @OneToMany(() => Volume, (volume) => volume.volumeAguasConfinadas, {eager:true})
    volumeAguasConfinadas:Volume[];

    @ManyToOne(()=> CategoriaCurso, (categoriaCurso) => categoriaCurso.id)
    @JoinColumn({name: 'categoria_id'})
    categoriaCurso: number | CategoriaCurso
}
