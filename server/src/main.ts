//import { JwtService } from '@nestjs/jwt';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function start() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new JwtAuthGuard());
  //app.useGlobalGuards(new JwtAuthGuard());
  //   const jwtService = app.get(JwtService); // эти три строки рабочий вариант пока отключила!
  //   const jwtAuthGuard = new JwtAuthGuard(jwtService);
  //   app.useGlobalGuards(jwtAuthGuard);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
