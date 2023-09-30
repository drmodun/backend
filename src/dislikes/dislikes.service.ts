import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DislikesService {
  constructor(private prisma: PrismaService) {}

  private async createDislike(userId: number, reviewId: number) {
    await this.deleteLikeIfExists(userId, reviewId);
    return await this.prisma.dislikes.create({
      data: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }

  private async deleteLikeIfExists(userId: number, reviewId: number) {
    return await this.prisma.likes.deleteMany({
      where: {
        userId: userId,
        reviewId: reviewId,
      },
    });
  }

  private async deleteDislike(userId: number, reviewId: number) {
    return await this.prisma.dislikes.delete({
      where: {
        reviewId_userId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });
  }

  async toggleDislike(userId: number, reviewId: number) {
    const like = await this.prisma.dislikes.findUnique({
      where: {
        reviewId_userId: {
          userId: userId,
          reviewId: reviewId,
        },
      },
    });
    if (like) {
      return await this.deleteDislike(userId, reviewId);
    } else {
      return await this.createDislike(userId, reviewId);
    }
  }
}
