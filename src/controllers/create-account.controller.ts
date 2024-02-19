import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('/account')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  @Post()
  async handle(@Body() { name, email, password }) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      );
    }

    const user = await this.prisma.user.create({
      name,
      email,
      password,
    });

    return user;
  }
}
