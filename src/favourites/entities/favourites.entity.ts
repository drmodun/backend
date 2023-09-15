import { ApiProperty } from '@nestjs/swagger';
import { Favourites, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class FavouriteEntity implements Favourites {
  constructor(partial: Partial<FavouriteEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  gameId: number;
  @ApiProperty()
  genres: string[];
  @ApiProperty()
  userId: number;
}
