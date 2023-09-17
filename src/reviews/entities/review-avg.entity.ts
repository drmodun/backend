import { ApiProperty } from '@nestjs/swagger';

export class AvarageEntity {
  constructor(avarage, gameId, count) {
    this.avarage = avarage;
    this.gameId = gameId;
    this.count = count;
  }

  @ApiProperty()
  gameId: number;

  @ApiProperty()
  avarage: number;

  @ApiProperty()
  count: number;
}
