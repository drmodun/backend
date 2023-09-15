import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';
export class CreateFavoriteDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty()
  gameId: number;

  @IsNotEmpty()
  @ApiProperty()
  genres: string[];
}
