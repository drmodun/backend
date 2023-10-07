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

  async getLikes(userId: number) {
    const likes = await this.prisma.likes.findMany({
      where: {
        userId: userId,
      },
    });

    const dislikes = await this.prisma.dislikes.findMany({
      where: {
        userId: userId,
      },
    });

    const likesArray = likes.map((like) => like.reviewId);
    const dislikesArray = dislikes.map((dislike) => dislike.reviewId);

    return {
      likes: likesArray,
      dislikes: dislikesArray,
    };
  }
}
