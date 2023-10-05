import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  private async createLike(userId: number, reviewId: number) {
    await this.deleteDislikeIfExists(userId, reviewId);
    return await this.prisma.likes.create({
      data: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }

  private async deleteDislikeIfExists(userId: number, reviewId: number) {
    return await this.prisma.dislikes.deleteMany({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }

  private async deleteLikes(userId: number, reviewId: number) {
    return await this.prisma.likes.delete({
      where: {
        reviewId_userId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });
  }

  async toggleLike(userId: number, reviewId: number) {
    const like = await this.prisma.likes.findUnique({
      where: {
        reviewId_userId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });
    if (like) {
      return await this.deleteLikes(userId, reviewId);
    } else {
      return await this.createLike(userId, reviewId);
    }
  }

  async checkLikeStatus(userId: number, reviewId: number) {
    const like = await this.prisma.likes.findUnique({
      where: {
        reviewId_userId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });

    if (like) {
      return 1;
    }

    const dislike = await this.prisma.dislikes.findUnique({
      where: {
        reviewId_userId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });

    if (dislike) {
      return -1;
    }

    return 0;
  }
}
