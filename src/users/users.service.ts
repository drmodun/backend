import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );
    createUserDto.password = hashedPassword;
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: number) {
    const user = this.prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true,
        Likes: true,
        Dislikes: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User with that id does not exist');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async getFollowers(userId: number) {
    const followers = await this.prisma.follows.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: true,
      },
    });

    return followers.map((follow) => follow.follower);
  }

  async getFollowing(userId: number) {
    const following = await this.prisma.follows.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: true,
      },
    });

    return following.map((follow) => follow.following);
  }
}
