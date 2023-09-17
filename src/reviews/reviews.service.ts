import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
    gameId: number,
  ) {
    return await this.prisma.review.create({
      data: {
        userId: userId,
        gameId: gameId,
        title: createReviewDto.title,
        body: createReviewDto.body,
        score: createReviewDto.score,
        gameName: createReviewDto.gameName,
      },
    });
  }

  async findAllForGame(gameId: number) {
    return await this.prisma.review.findMany({
      where: {
        gameId: gameId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getAllAvaragesForEachGame() {
    return await this.prisma.review.groupBy({
      by: ['gameId'],
      _avg: {
        score: true,
      },
      _count: true,
    });
  }

  async getAvaregeForGame(gameId: number) {
    return await this.prisma.review.aggregate({
      where: {
        gameId: gameId,
      },
      _avg: {
        score: true,
      },
      _count: true,
    });
  }

  async findAllForUser(userId: number) {
    return await this.prisma.review.findMany({
      where: {
        userId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto, userId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    if (review.userId !== userId) {
      throw new Error('You are not the author of this review');
    }
    return await this.prisma.review.update({
      where: {
        id: id,
      },
      data: {
        title: updateReviewDto.title,
        body: updateReviewDto.body,
        score: updateReviewDto.score,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.review.findUnique({
      where: {
        id: id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number, userId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    if (review.userId !== userId) {
      throw new Error('You are not the author of this review');
    }

    return await this.prisma.review.delete({
      where: {
        id: id,
      },
    });
  }
}
