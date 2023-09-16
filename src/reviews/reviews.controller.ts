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

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getMe(@Req() req: any) {
    const reviews = await this.reviewsService.findAllForUser(req.user.id);
    return reviews.map((review) => new ReviewEntity(review));
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
    return this.reviewsService.findAllForGame(gameId);
  }

  @Get('users/:userId')
  async findAllForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.reviewsService.findAllForUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
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