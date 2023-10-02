import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(
    partial: Partial<User>,
    likeScore?: number,
    followers?: number,
    following?: number,
  ) {
    Object.assign(this, partial);
    this.likeScore = likeScore;
    this.followers = followers;
    this.following = following;
  }

  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  bio: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  created: Date;
  @ApiProperty()
  updated: Date;
  @Exclude()
  password: string;
  @Exclude()
  Likes: any[];
  @Exclude()
  Dislikes: any[];
  @ApiProperty({ required: false })
  likeScore?: number;
  @ApiProperty({ required: false })
  followers?: number;
  @ApiProperty({ required: false })
  following?: number;
}
