import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';

export class ReviewEntity implements Review {
  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  gameName: string;
  @ApiProperty()
  body: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  gameId: number;
}
