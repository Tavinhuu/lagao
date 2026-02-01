import { Injectable } from '@nestjs/common';
import { CreateHomePageDto } from './dto/create-home-page.dto';
import { UpdateHomePageDto } from './dto/update-home-page.dto';

@Injectable()
export class HomePageService {
  create(createHomePageDto: CreateHomePageDto) {
    return 'This action adds a new homePage';
  }

  findAll() {
    // return `This action returns all homePage`;
    return [
      {
        volume: { id: 1, url: 'https://lh3.googleusercontent.com/fife/ALs6j_FgyZvbobfmlFfxUNAHOtm6MVxP4uSWsxsT6pqi07UwzM8nmbLOauQI9UNrm-roxy43eHC5ijv4dFFk4PZwVCjuBs3IcS5hBpJCVQcyb4423YBACyR8OTjqPTCgoiEpag0U2ucymKc8IDUrpz1ufJDzorFBacOxA7ucPd1JvGlYMg5GKdDgF1VC7hcCk2KYHJMFMrvDOIZUgPkaNwW8W9TzybwS0A6QRTZwZqosI5HUonxES7EHcbS6X9a3xR2e05juuu2yJnC6Y-OrVivZYqIG5F95OOqo-WIY1bNG0bDp01czyqTmzUzT_MJ7GSeLOdNd-X4LXAr2kr2zJsTzmyfOqobvNWrornmv79bXxvDeOzECFZn66qPuZJfJh8QUzErBZnVSJP-ko0JzO8KNhEUnmsmIevs_WoGDof9hTSR-0S_mbS5G5-D8UC1ZMzdaHy_Tcinjxr94ujxV7cDnTmDYKZaqUOgxtbOAuFo-zs07Edrq_iZBtmcPgihaDsgi-D9LQS99UeEcpHRMZylkOKnPo6zekAeIdK5XRxxEcvySTo64eu5Xizehf7JyvcZY-JZa1PrkgR84ujha2NByqgtljkAsgQUi_2mlTH2-0K1-fkH91rYTt-Ocl188iUGCMef9c9nukH04196TbCgQ2GQMEm3PwigEJND9xum0Y_ZrNct5Irs3ZlzRKCHK5MbnR4nJdRKRdzGp_TmE8vGHUkOrCtyFU6exmk6k4UaWWRAU7h5nh0Wex2fCF_v5E4GyjoPkqwPOg5V-DaXqbluE9aSrzUZWZ1uOlDg1eUS4e2l3NCk0xmgmdXit_GXaDQTb1eN-41SjbdI131mPFM1rrMUfJSe7nHnyNhV5TFY3Kk3qx0erliqzVpW679EC3C8hhCODG8xWp3N4yOioNXf3u7GZO7XOh7pHGrGESdLtG450Q5QIaVzTxxbbdvp7UB1D8XgcIANX31MDx4L8B6xuGI4gbxo8NGXzn7fuah1F5BU0W1tp3QOOMqV_0OSIIWJYFSJUHIR8ZQZpWXpachRdj2D7AFfpKneaP_pBGvtj2qAvcJVpdYIhBiuhj8Yg3Ow2nynsNcmZodlcS9B44HEgLFacIkv0kfjr1SGyrOkbrM_uO9025vvAlqplkYB15GFBGy-qJwq7l_QFRMsYw6-0L1019QgCelI8ONnx824KBApiW7hj-YVN7oWtHOcIhZWcar-ARXMOEskxtr2pSRW35-9z_laEtQAunqmS_dNrDwX6FxHknkphrBxFLPF03rZ6MelR5wp7zvPF4XO4bt3bsOZ4r0Pqz5ajVVylCtEUhC39PUu9Q4H-38l0E5yvFXjmfOJskI0fb9rLmSY8XZYeK1Zg02cDq8FYdcKRuoaX7r9J2PFHTJhlc6kXam48xlhis6Ith1XIuK2jnRE1NArzdTYkyKxhI-IKC_rDyocK5r5P7UDB6Wun_kvOrAPYCo4AbEbb9YZdV2IFqqiCR7Kyurz-bXJTC7ToxKX0u_LLVd6_MI4du9_uXqdBxL5HZBfS31yBToeaGCFj9v4Fkx1YdfcwIGedKrX7GpIgvlIP8Vi6jLWuIkddFycPOh1L2QGmrR0s2owSAumbj6PTo_Jq6Vae9K1hbMR9fgb3VeICQ6etpdqzFp3BzjXc2Ak_bQ3_vdZby-hDGVmiHnkwvhhiC_vfnA28BVmoCso3XidQbAA6lJfp_vI3QJe8WtZjV4o=w1318-h692' },
        titulo: "EXPLORE O IMPOSSÍVEL",
        subTitulo: "Seus primeiros passos para começar a mergulhar.",
        textoBotao: "Começar agora"
      },
      {
        volume: { id: 2, url: 'https://lh3.googleusercontent.com/fife/ALs6j_H1TH8cC52objD0fX9ym8HgrC5xHj0i52_syUCvSOE47WcZKC0SK8zvDTpn5w6lmwu4ze8yrCN_Hg2ZO0mxty4O5LgdLFlbYj4IyF1iT2TRXqJrqdhI_V3yaOs-af3egy_Mabuolv6mbv9mQzylx-jNvIf_gnMhlCR9vivflo-Au02ikXHsu5zizOghbocKQfQQI6Q40fnmE-zrTgu8sJ-WS0vwgsrzgIY0tZYbKGVFo3ufcJJSWtmA_RJpdiGuNcOi6EYOfKOWDWkaR7zjni0zX6iksVvw4MGslwCn2uD8f_1Cv8nCMr7GkUz2QKMETW-4IGtZF4cQJnbDBngVQzLsjCXFsQn0cq7JQ-FVxbX3HOMbjvCThdNUiEDiuxjuEbiKUXghPb-13B0MDsm4_Q6_4IcHwHD6UnsYS1okCRt9UPU39Dsl1fxMGbH--cttFivz_FYoj4T10DCtRwKCPssBU_ATMmub4MMY_uXaQO0w16fQGIQyvInw02L7Z1YNC8jhIeeU-EQC_4L8NP8UFsmWyGI3b35wLch9fODwRP6wtLSTi5e2QAFbOgEIJmUt5sgo9f5SVaZ7wqCXGZct9_oKxCITD4luYb4yvQe1AWonoCcu5Yu7FLDWp8upaajs5G15nOjrfgamJ6qEU_DQwmbzpQypN_yOGSXAD0_mINjsD5ctWIwOELD2nQYE2a_WadHIGT55c1eOqT3la5Gr1oWcCEEFTq6FhXDmzp7zrCUAczQrCiXVPiuNQSBEe2ogl8NjnUa56Pn-f6wC3ImvYZgaR-XogNEL9dV_ps0a5kbhuU5rC34_10pftYTZ-yJZm3oWul385yO5Tz2pBBKIgymXVzAKfV0QK9aOKCRhKlCJPlhxzfon-V7R5DNU5QeZ3xlsEjbS0tFXxIeuc4VCTkcAjB4Ezp6HoVCE9UVAe4RLW7Cpvq5Q6R1Ml2PVbzvpvEoigtuR7qcQYSPnDrEZCQjqN8zgCHMjAFZutFOhkjvsZKxfVxdXUjboMCnBVbnq3zj84kAZKpv7jaJdz1H-CoSpTSABjcsoZhzw1qm7YTECZHfp7SKP7DsYT0PjuQBkeXHUZBx_fgPDjTbyKSCwfBPV-btxOokht9iLsuBjRliSt-Wb2VqB7mfXyb0Sn7EaYlLfCO11hD5_EuG4URFtfOnMw8iYIjQEQ1_5Z2C9M11u3xxhRI8Zau60YhAk2SBkHaYtx7bfG4bdzSL9l8I2MAgQ2uRDawvh7zUoGJNGLLd7hL6kRY2YKn6xdpgls0dryk-mraz6jhri7WKsEzbeiQvh7ViR7sTR-gGmw7iZtup90XzNteRbMHZ4s-lNEiDs8R_cBQpqr29kH3t4gQzM9M1hZuqnxmIkbBx1gPBzAkHSxvP9IlqWmVhjvrKOfBvaP75DUSmjIhtIO-SzYz5Nkx_MvEzsGK0j0Rlq_oVBW5qW15tNOnKrzxlwk551UPEaoXZarpOGtdD0rVUs4mLmdULK8KAUfVNMbpuGLU8qTHxg6eSTBhrLzku-NGR504qLTTLjZ5u0yjfcznXcz9GmIF1s8w8GDYbo-p8vnCvvvB__w6vXfSl31sonNsmBOWRYJD48sOQHDXeARCfWvzATXUkXMYm2XzUvsIRlaQoTP2XdYmGxOXMiuRZjJ6pnPHmzwlcD_ahNPZ_r0-IsloNNSeTmypTXlignc3Eyzqv1fgTtk6MLDftnNXLxy24dI-g=w1318-h692' },
        titulo: "Sua próxima aventura",
        subTitulo: "Cursos e expedições para os melhores pontos de mergulho.",
        textoBotao: "Começar agora"
      }
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} homePage`;
  }

  update(id: number, updateHomePageDto: UpdateHomePageDto) {
    return `This action updates a #${id} homePage`;
  }

  remove(id: number) {
    return `This action removes a #${id} homePage`;
  }
}
