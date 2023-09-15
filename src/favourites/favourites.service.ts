import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favourites.dto';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async create(request: CreateFavoriteDto, userId: number) {
    return this.prisma.favourites.create({
      data: {
        userId: userId,
        gameId: request.gameId,
        genres: request.genres,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.favourites.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async delete(gameId: number, userId: number) {
    return this.prisma.favourites.delete({
      where: {
        userId_gameId: {
          gameId: gameId,
          userId: userId,
        },
      },
    });
  }

  async isFavourite(gameId: number, userId: number) {
    return this.prisma.favourites.findUnique({
      where: {
        userId_gameId: {
          gameId: gameId,
          userId: userId,
        },
      },
    });
  }
}
