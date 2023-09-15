import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dto/create-favourites.dto';
import { FavouriteEntity } from './entities/favourites.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('favourites')
@ApiTags('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/games/:id')
  async isFavourite(
    @Param('id', ParseIntPipe) gameId: number,
    @Req() req: any,
  ): Promise<boolean> {
    const isFavourite = await this.favouritesService.isFavourite(
      gameId,
      req.user.id,
    );
    return isFavourite ? true : false;
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Req() req: any, @Body() request: CreateFavoriteDto) {
    return new FavouriteEntity(
      await this.favouritesService.create(request, req.user.id),
    );
  }

  @Get(':id')
  async findAll(@Param('id', ParseIntPipe) id: number) {
    const favourites = await this.favouritesService.findAll(id);
    return favourites.map((favourite) => new FavouriteEntity(favourite));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) gameId: number,
    @Req() req: any,
  ): Promise<boolean> {
    const deletion = await this.favouritesService.delete(gameId, req.user.id);
    return deletion ? true : false;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAllByUser(@Req() req: any) {
    const favourites = await this.favouritesService.findAll(req.user.id);
    return favourites.map((favourite) => new FavouriteEntity(favourite));
  }
}
