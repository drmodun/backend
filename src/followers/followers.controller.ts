import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';

@Controller('followers')
@ApiTags('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':userId')
  async toggleDislike(
    @Req() req: any,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.followersService.toggleFollow(req.user.id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  async checkIfFollows(
    @Req() req: any,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.followersService.checkIfFollows(req.user.id, userId);
  }

  @Get(':userId/followers')
  async getFollowers(@Param('userId', ParseIntPipe) userId: number) {
    const followers = await this.followersService.getFollowers(userId);
    return followers.map(
      (f) =>
        new UserEntity(
          f.follower,
          f.follower.Likes.length - f.follower.Dislikes.length,
          f.follower.followers.length,
        ),
    );
  }

  @Get(':userId/following')
  async getFollowing(@Param('userId', ParseIntPipe) userId: number) {
    const following = await this.followersService.getFollowing(userId);
    return following.map(
      (f) =>
        new UserEntity(
          f.following,
          f.following.Likes.length - f.following.Dislikes.length,
          f.following.followers.length,
        ),
    );
  }
}
