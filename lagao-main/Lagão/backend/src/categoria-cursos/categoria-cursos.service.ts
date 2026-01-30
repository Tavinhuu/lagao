import { Injectable } from '@nestjs/common';
import { CreateCategoriaCursoDto } from './dto/create-categoria-curso.dto';
import { UpdateCategoriaCursoDto } from './dto/update-categoria-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaCurso } from './entities/categoria-curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaCursosService {
  constructor(@InjectRepository(CategoriaCurso) private repo: Repository<CategoriaCurso>) { }
  create (createCategoriaCursoDto: CreateCategoriaCursoDto) {
    return 'This action adds a new categoriaCurso';
  }

  findAll () {
    //return await this.repo.find();
    return [
      {
        id: 1, 
        nome: 'Recreativos', 
        descricao: 'Dê os primeiros passos no mergulho e descubra um novo mundo subaquático! Nossos cursos ajudam você a ganhar confiança, aperfeiçoar técnicas e seguir uma jornada de aprendizado e aventura.', 
        volume: { id: 12, url: 'https://s3-alpha-sig.figma.com/img/2aec/af34/10017293d7e8f5bf6554179e99d459cf?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DQfOb6iHRTatpPMJhda5~vu6T0UDFZVmGsd-vVert7IMQLJcFfyJ2SlbjmC3s5voNwxzgIibv2bGYcgzGLMsyJ8YQ1Dk0Tf0AmbK~LVn-pBIsaHKGq8078jc~4q4AYSftL1oT-gLONxyeqhz5IuB9XuATo1U5vWIp3pRm4fsrnthWT5aGY-IeGLX4HcXYmNg16GOUhTGmaba5112K59ngHZ0SfKY11JjJGDFqaNd8f1It0q7HJS1UElZIq1a0gw-tk4DmTdf-BP-dRaeiouM9FhRjEnU4JUxYFNiNhFNCKP12whWTIx6xMEUZlCoWX9mgw2xdqYRHpa-6WbxskQebQ__' }, 
        cursos: []
      },
      {
        id: 2, 
        nome: 'Técnicos', 
        descricao: 'A próxima etapa da sua jornada subaquática! Aprimore suas habilidades, explore novos limites e mergulhe em desafios mais avançados, elevando sua experiência no mundo do mergulho.', 
        volume: { id: 12, url: 'https://s3-alpha-sig.figma.com/img/d66d/d114/99be50e3148ef741bbce2325c8428ec9?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qFILPeWh35FwEv7o73Vo9gU7GM4bYBeV1CoPA4Pp9KyrYmLoKTrzpQINWqivas5GCMx2FhpuivHQE5ETS-L4OIDYJubbDDWnIKCkp1Qx74kjr5rQKDazc04y2NNvCScZtkYEcBY1BtQlZAntThLrjdci7bfAwn7OgkEm7Mk8vRa9N9ihdx2I9X10cgUjlbz6FNIb9knXgZZVfF0tUDRFsHll-Z7bwNDWbRGVDGFeUiAxviqI-BhUVTW7FM-dpFhtnhUZkXUGXjUV~q7StfcA~TyHQlaa0Uct12unsD4UzuZWDkfLdCjJrxou6ETCD2jG36ND-kYgmWI3yt83pOI4eQ__' }, 
        cursos: []
      }, 
      {
        id: 3, 
        nome: 'Profissionais', 
        descricao: 'A etapa final da sua jornada para se tornar um especialista! Torne-se um líder no mergulho, capacite novos mergulhadores e transforme sua paixão em profissão.', 
        volume: { id: 12, url: 'https://s3-alpha-sig.figma.com/img/a9fb/0829/609f8cf4c27dae5ac3f9d361f42b770f?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dUcwr5LATcsa62xUoEl-zoGALFz2VbRUTc6EqzCO26TflsXE0Mb2IZLgA1CSxH8T2KqdxaHaSDYMuKdAKotMScmVaIQZyYGg69xmp2ItQl14LOu1rIscEH8-3aLhkFeyBMwBNMiKJ8YkJUZFb4DlNmWZZ3mdykfO~bvDynQVsQwR11SMHnZdozmqlrrhv0PhTE7GwdEVk~07MJ3BvdnUCwl2zWnwmQJmuFh4KykFX57vzKnibZGvsHe2z5lQdCLGloPy5PxvE8aAGZceQ1nrqBuVVFsXTvFiDI3A6RweIHRrmnW9EFL2DLi5-1IF5zVBIGw8KMt9jhwuVbvPXmvZBw__' }, 
        cursos: []
      },
      {
        id: 4, 
        nome: 'Primeiros Socorros', 
        descricao: 'Esta etapa é dedicada ao treinamento para emergências aquáticas, técnicas avançadas de salvamento e suporte e também a formação completa para salva-vidas.', 
        volume: { id: 12, url: 'https://lh3.googleusercontent.com/fife/ALs6j_E4OerRygvqKe1YQPW_kVqMT2GL7-G0tzk0KiCgRNQtns8C3d1O8_bUQOx6tG4WMDQurqYtxYNF1pi2xI3DOKTuB6ojON_DW7TUaRA3pL1sL678UlsU9vSl5muEV75YsThTaCno7Wv6YJojiPWnPku-uJhcAqMCdoqw7FM3-6TufxaDSbBYjDx-fNoJD-G-GrEVkLU1B73JP4oiCEsMhpTSlq-lfybBQEijD9YkRAkEKgD8J3ZRpYiy8mP4u6tSmXnQ3JC_OMvxcDozaVqKKx_OGMHGEgqWjMrTFblSeAy_9PIjrNKuW1nRoGjDg-6ml7Csj8j4K8GX2sKXhmDDiQeLt9I0fD1DpOUjnAwaYV7j0d9LtCVbf7w-iY5Urm-qkvQMuC-P3g_t5FmMhOz1uzUgL4JiFG8sRWj0vVlmRTceKugDK4TJNQtmVbEVb4d2EVzMnluZJz9Dvro8ZLlF-9mBKTQuPLxDpfFpAvgk4_1SSTBO8XoQlurDXvr3bzx871t0dVQdtNWEqU2pfIcA0RquWW7bcIO7TWdCFYThUxi5CM8xb4wnld3zyE0yq-7pPdnaN3pyANWoauJjFr4OgKUw-EUFPc2RnTxpoZVR1QndgFcOI9Rq50_8trfAvmxhZjTyFdsjUSr_O1Dzdy0DWO9sECXFHHiHT_hH6cfD_yf6A408LmM5g9lohzh8HK1WZKP7NMCmbVyR8Mt2hPXBU-B70J97RpeoP-hW-0EmYZ7dSbDXR7ihyVP7BqhTQ_MRP1qDnNAX4X0B2zxRQkuBBhEQ03Nlmzm8RmvKQFwoJFfKXegzSaSwmVlupCUlQcHhZO0neEntYz7H_WDe6yKatsENxoolxv3PCHGBqgOOfZoPgKnIOYuUBuKIAp-QeBddBpAsQItuqHTj4JvQAw0c-pSztYNcL4n_ROV6r8fvnC6-l11RAYPSPp667zP7ewJk3kP4LAl6Y7553wUpJswPLwXZTZQG7xk9FFrUiC5CH-40nQhuyLoiuxCP5mtZ315zDfLgy9zX2wbo_lcu-N4iQ-lEo1ZETVaiJSUMxmsviuzOeXVllDT7QFvKppUJ5ReWNQkfqsgwnhr9cXcNOkPsRBjN9eQ6QWT-n21VF2d2arlvCJMNxmhJG2SOuvFQ7MTksTyWplF7l44nULBHWRvNOK28GknGMNdFaPOBE3jcII-pQltE3gaocR-cCHGP9ZfM0lRrMP1jIdlE-hsND6Nic_rStdmXlngvmeei6zDf3KP1-tV1DqKeKaxUiRxeiWrvlRgXee4eFK28lc5qvdMNOflaa9NN0a6arMkDtq85ggkw6eHbncARgVVXUl9RyvKhw3N9aUY5PCa2oX2wXWHI64r8muKU3Qqa2syJ9S_MIul7C_OVJhRW1gDPSeCh2oQtKPLdtZub2JuOFhyhHtS55FNzKd4owbqTPzGSSiQqYxtNIpXI0q45tGFWPxEbJGAof-Fj4xskbooASzvkfdW4jVnaF1jyFMYlSSdzubuigqykxca64G1NSPIoCmhXqWz9ujiNPR2085MQQV3p0B8ts5giecTGTMKhfVZVY-E30stU_vBzpajIQo4GqJhIBU_7UW_o_gAiNGb1nRwvpuPWePv_7-AuyidZ_B7tBEYKwbqCQJn5gwr3D_7lgGLEVifSuyla3hKP0rS3uYzb8-XoFjpI53Xcx9VaT_EYF3P5hXeRR9sVjFJIvKCzKIdE4HA=w1878-h1004' }, 
        cursos: []
      }
    ]
  }

  findOne (id: number) {
    return `This action returns a #${id} categoriaCurso`;
  }

  update (id: number, updateCategoriaCursoDto: UpdateCategoriaCursoDto) {
    return `This action updates a #${id} categoriaCurso`;
  }

  remove (id: number) {
    return `This action removes a #${id} categoriaCurso`;
  }
}
