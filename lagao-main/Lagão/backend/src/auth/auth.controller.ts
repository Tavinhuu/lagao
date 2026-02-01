import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  
  @Post('login')
  async login(@Body() body: any) {
    // AQUI VOCÊ DEFINE SUA SENHA DE ADMIN
    const usuarioCorreto = "admin@lagao";
    const senhaCorreta = "lagao@admin8080"; 

    if (body.username === usuarioCorreto && body.password === senhaCorreta) {
      // Retorna um token simples 
      return { token: "acesso-permitido-admin-lagao" };
    } else {
      throw new UnauthorizedException("Credenciais inválidas");
    }
  }
}