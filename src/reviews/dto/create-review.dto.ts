import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  body: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gameName: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsNotEmpty()
  @ApiProperty()
  score: number;
}
