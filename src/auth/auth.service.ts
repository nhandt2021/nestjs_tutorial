import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from '../dto';
import * as argon from 'argon2';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // Generate the password hash
    const hash = await argon.hash(dto.password);

    // Save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      // select: {
      //   id: true,
      //   email: true,
      //   firstName: true,
      //   lastName: true,
      //   createdAt: true,
      //   updatedAt: true,
      // },
    });

    delete user.hash;

    // return the saved user
    return user;
  }

  signin() {
    return { msg: "I'm signin" };
  }
}
