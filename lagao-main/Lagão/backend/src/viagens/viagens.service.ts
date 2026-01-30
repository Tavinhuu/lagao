import { Injectable } from '@nestjs/common';
import { CreateViagenDto } from './dto/create-viagen.dto';
import { UpdateViagenDto } from './dto/update-viagen.dto';

@Injectable()
export class ViagensService {
  create(createViagenDto: CreateViagenDto) {
    return 'This action adds a new viagen';
  }

  findAll() {
    // return `This action returns all viagens`;
    return [
      // {
      //   destino: "Egito",
      //   duracao: "7 dias",
      //   inicioViagem: "28/10/2025", //talvez tire isso aqui por causa de agendas?
      //   titulo: "Experiência Incrível",
      //   descricao: "A melhor época para mergulhar em Recife é de setembro a dezembro, quando as águas estão mais calmas e mais claras. Venha participar dessa aventura conosco!",
      //   volume: { id: 12, url: 'https://lh3.googleusercontent.com/d/1yluW1PAp6yr2r_VRlZsVdsxQoYq1VY4b' },
      //   agendas: [
      //     {
      //       id: 1,
      //       data: '15/03/2025',
      //     },
      //     {
      //       id: 2,
      //       data: '18/03/2025',
      //     },
      //     {
      //       id: 3,
      //       data: '24/03/2025',
      //     }
      //   ]
      // },
      // {
      //   destino: "Recife - PE",
      //   duracao: "7 dias",
      //   inicioViagem: "28/10/2025",
      //   titulo: "Experiência Incrível",
      //   descricao:"A melhor época para mergulhar em Recife é de setembro a dezembro, quando as águas estão mais calmas e mais claras. Venha participar dessa aventura conosco!",
      //   volume: { id: 12, url: 'https://lh3.googleusercontent.com/fife/ALs6j_FKxfpUSwzZavWLtiisC1CgLXhb6Njco-PchWAKM6mrP9wzuZDUZ_g-HMavq5w28VnRLu1r8Gwyv-ckVBFe1eGNvTBICqNcZnBwm7yn6H2pHAAGFp4d5AVm37izR-46j3BrfBHi-NBiX4AraSn1MYG8BDNsI7AuFTnJS2aYLLwzqv1DsmNPl1vDrks8WP3sUEElfBzAgP35ad3g_tKkj_87ist14QK8_xZoOzmh39UZYN7SiVKDlxyGWTyiGxUW6vEAsc0_znUlnAzK82FpUwcZ1xpNXh2qppAFIzElmzYcj3VTQWwBALnQacpX2YV_pWrt6I4apnH4NTcgm9kU0jNnKP7hI3rQMtZVT5yGgxMtxGt7UZRZwzusyWA6Efuo2XI3Jgg3yo3Eq6ToC6-Qr3G9HlGyJNKItiwEg_138bGdrPPezNpGzHMHg01u4HKk-jAPafHAxY8x-pWYOdNnhhAHgSWJaQE4yGRBdVtfHqUXWSZDz-jW_xcWqAS1kOO3AM9HrhsDb3NYwCW8rFmPIIRvdA80XQC91C1PstrV8O5YkFqnUKrCttyiNZMj4KqiAYSAaQ6PDvki2tOdacOYjJceruyLAoPrR-ilzSB0bGDqmA5nvGZej7OOA3fXLCUurtCVmVk7Rc5srKixK8VXM_v7gyHJVTWJo0nJgWRGLlL-lkOPkzVsXJxggvY5dtUPz8nvhN6gLAD9xtuv_6D7KsCJggJvz-8e9iHnp475eTD2Dl3dLXuYngWZad9je03UuqPA0nXFB0h3BXyJqGFrHOrriB8ORZoJbcZjtwxAU6DirSodqS67yNnRQvqTrrIWbF0YulPnEt3Sx-BbxKTTLFxQclO3EP4BVsWgzUR_r4045tH7mZjdgnr87n3qId9BXKWVJ59FYeGFcIgoi-ciZw7wWSGPd47OySgiALvh1zrIAEc51wX1N3HhQ2mwFx6hyMSMRN05UCOCt1bbNX_NtwKsRhmEQSH3ht5ERHaId5jrf-H7WTO0ltgeJrMEIeSKq7fX-9WlSxS54U-OjIAzRTAu-bi7v2Y7vUmfb9SKkTmFeMrQolU0M4VeWe3O7ZHrYN-2Bnciv2ohs7hOi4xEdd22IAwLe79uQSgKgsfdhcHGpwBSJ4vy2V-ee0lCE8kVXqkRVk8XO6wEFetI65ETfD_L7iaN-V6Qhjg1bY44P6QM1LG3e--ntuQ1OAlkg9IeNHxHo8kVVz_zOWnshSRMu10kh62AQtsjdd5guVDxBQn1QWLiQzsArpWxJXQedtCgnMgn5vvVoX3n30nQh140TTbMXtNcjSWmf_aRtRkJY8eSAnj_83BHpnpHgA4aQxfRlQoeJzUjzADHW0ghD1XR1PkVe09_Snp-o8ihdRgaxvQrJfluK_ivaXILWdKWYQGE0API0QLbpvGtSf9EDhMQxFbn-DLyhPVMmUkPL6uf8SxaVllgMCmZsGhMUxMot9kHKmxuIaUxIRgZr9fOKSO6Nr9kk4C1D1Z_80D267UEKVoSG0P7du3IfkjKt2fUF4zPzxz9lcpPjrac06XAyzIM1opf8bzL7vDqbx017M9US14R07S5CeVCyh8Yhx080H4qrSkQkxbTWIdAD_Fm0YkdZjyUEDS5GzjXYIL1LMZwGCQbBrt2monV1UPphTPVfzwN-dqdBspQwQdj6xH4NCSTr_zRRCND01uN00n-BNYr7AyFD-8K6TvrFhuLXPCwbQ=w1318-h694' },
      //   agendas: []
      // },
      // {
      //   destino: "Recife - PE",
      //   duracao: "7 dias",
      //   inicioViagem: "28/10/2025",
      //   titulo: "Experiência Incrível",
      //   descricao:"A melhor época para mergulhar em Recife é de setembro a dezembro, quando as águas estão mais calmas e mais claras. Venha participar dessa aventura conosco!",
      //   volume: { id: 12, url: 'https://lh3.googleusercontent.com/fife/ALs6j_G-cGJsOqJsL8SspJkSwws1wUIgFHMgUw1LEARXufYB7LR1XAomWVmIFXOlHKMV0RxSp9ZQL6OdryJMOS72Oa9WZrFnt9l1F2btoFVcIxUVuXYn-ZronMZZbP9rSCoAEcw-ZBknzZ6hpOSG24kDq7hZ7nxiDlLVD1WAabbSjl-wZZjEa_J2XmhmYd596nJ1qG7S3LlQtLCRC4d4zgkKEdlKWp74DjS5omlvffyfFHcbdLWg-x4nhy4JRIr6Tb6DoYLWgNtc2VAk3nBWhxMgExf66NoGUAJsaPQHPBUupXXDZhS1qfkdmz2mtM4MERDSowzj-nr0eZW49eCCICAmjSM2CaPAjzFTLKXmoT3bM0Fux0bB-6gVWUR_FBdCq5zozq0g7yUd3ylNtq2hm3HW3s2gF5qgPXyWVJk1b4zMkJ3D0c7sTgE-YyeL35gLSZfpvNzHPimmSlCLsduGJCq5GaDpllthq0qPam6A0lQm0pkwsgvNOtDKqz2aA7bK339L7Tm9XlcPE2pXVeLZwowfyhgXktlhNAfKfGx3DO375sICfwARC2T6g7EMVl6ziuSR1dHsX61AdKjjvqwAhXZPymwHHDBSBGcl_wWdHA2YDibcPMjwDlYLXk8a9UDWR1mrFyh3SU45AlpxT2imUjZ49y1F_AmNYf-BzoHs5qNpnyTrgr_QKJd5f0zJJK7_5n_pISoLlTZ0de6zIXrl_ygIurkRyzcnWusGL0cBMJYW1s9vHzGbA9LAnAMOZh-c83RHzX7H3Tt8J7TFprnv9EDF2b5L5_WTlBkx6a367M0OmCGkbIlTVsqMhl9lXGuhXX9VPwHOUH921pLe_tQFZqOSLvB8AbIShB7T57j_WQtYpsno1HO7Uzn3tcrZdDlxXQUung_v3yhcy8L-giouOvUUFuuSmpf26Hr0yShUGB1PfLIvAEFrlE-jPbh3oWrAxxKeKrGNE896XgdoE8g75HdeecA3kwq_KQGaCpSZLGCB_0sHWqAX09hFcwApMnwTd9tvoIpTo7V9pQ0BVscr6FZtVz_YyxJaegfdzfDZYxfmkGgPWaEspCPOBxA0KImV88hmniRkO5f9wgbdVk2RrQ3ksy8b0rpFxTyCn6ic9H3sjGEYSS4uAE5VzCvjm8I2acQOXNs7BfUIgdpFCNvc7lbSOJTphsjc7xAxQYABsNf5_9QC0Gmza2aXkly5IBXax6qrA9_PgXXHOYcw_xQCJpdf4bJBAxUjvosYjM0Lxg_mGi7ejQvH0uGkpivM_jzO7hFHYGyCcmERWvDgKuEzwntqDKJJQ-5rXvW_x5dWsmrfmmmL7kOV-jrIp7Ax2KgUfxP8GGi0t5gM_cgzIMP0BeR_kAkLJ6ORU6Hf4YnNJ1xQfSf3yGWzysvDPA1ahBYQms7yTFPJcF-c6O0SpXM8CqnutyJg6VW_1HA-SNvWvN1sWMmo7899YFJDsAa6uS2pAReXSGOvv_LkveAUzPWS8DHi9dHXVAlrk60U_GG37OJhAnefpenBvkJfbyhryP5n9GWE0vAzGm3ZDZTWBJmCblGV8qE8k-HBPW5yUbBq2bxfU9r_xtQjcCepFS0usxO-k1VHrxD6y2V_RptoWYm653lHvqbA-y2hthZmYdRTOFazEboSIzOH3orafFkmUd-_KnUjGUqe_TkAL1uHxBfGn5C9BXYsq7bm12WiSKQuxZKM-7Vp3S4Wem2IIs6HdxRJLg=w1318-h694' },
      //   agendas: [
      //     {
      //       id: 1,
      //       data: '03/03/2025',
      //     },
      //     {
      //       id: 2,
      //       data: '06/03/2025',
      //     },
      //     {
      //       id: 3,
      //       data: '12/03/2025',
      //     }
      //   ]
      // }
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} viagen`;
  }

  update(id: number, updateViagenDto: UpdateViagenDto) {
    return `This action updates a #${id} viagen`;
  }

  remove(id: number) {
    return `This action removes a #${id} viagen`;
  }
}
