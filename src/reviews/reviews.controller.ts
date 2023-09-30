import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReviewEntity } from './entities/review.entity';
import { AvarageEntity } from './entities/review-avg.entity';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getMe(@Req() req: any) {
    const reviews = await this.reviewsService.findAllForUser(req.user.id);
    return reviews.map(
      (review) =>
        new ReviewEntity(review, review.likes.length - review.Dislikes.length),
    );
  }

  @Get('avg')
  async getAllAvarages() {
    const avarages = await this.reviewsService.getAllAvaragesForEachGame();
    return avarages.map(
      (avarage) =>
        new AvarageEntity(avarage._avg.score, avarage.gameId, avarage._count),
    );
  }

  @Get('avg/:gameId')
  async getAvaregeForGame(@Param('gameId', ParseIntPipe) gameId: number) {
    const avg = await this.reviewsService.getAvaregeForGame(gameId);
    return new AvarageEntity(avg._avg.score, gameId, avg._count);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':gameId')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: any,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return this.reviewsService.create(createReviewDto, req.user.id, gameId);
  }

  @Get('games/:gameId')
  async findAllForGame(@Param('gameId', ParseIntPipe) gameId: number) {
    const review = await this.reviewsService.findAllForGame(gameId);
    return review.map(
      (review) =>
        new ReviewEntity(review, review.likes.length - review.Dislikes.length),
    );
  }

  @Get('users/:userId')
  async findAllForUser(@Param('userId', ParseIntPipe) userId: number) {
    const review = await this.reviewsService.findAllForUser(userId);
    return review.map(
      (review) =>
        new ReviewEntity(review, review.likes.length - review.Dislikes.length),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ReviewEntity(await this.reviewsService.findOne(+id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() req: any,
  ) {
    return this.reviewsService.update(id, updateReviewDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.reviewsService.remove(id, req.user.id);
  }
}
