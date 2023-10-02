import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowersService {
  constructor(private prisma: PrismaService) {}

  async follow(followerId: number, followingId: number) {
    return await this.prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
  }

  async unfollow(followerId: number, followingId: number) {
    return await this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
  }

  async checkIfFollows(
    followerId: number,
    followingId: number,
  ): Promise<boolean> {
    const isFollowing = await this.prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    return !!isFollowing;
  }

  async toggleFollow(followerId: number, followingId: number) {
    const isFollowing = await this.checkIfFollows(followerId, followingId);
    if (isFollowing) {
      return await this.unfollow(followerId, followingId);
    } else {
      return await this.follow(followerId, followingId);
    }
  }
}
