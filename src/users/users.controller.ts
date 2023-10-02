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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async getMe(@Req() req: any) {
    const user = await this.usersService.findOne(req.user.id);
    return new UserEntity(
      user,
      user.Likes.length - user.Dislikes.length,
      user.followers.length,
      user.following.length,
    );
  }
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return new UserEntity(
      user,
      user.Likes.length - user.Dislikes.length,
      user.followers.length,
      user.following.length,
    );
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(
      await this.usersService.update(req.user.id, updateUserDto),
    );
  }

  @Get(':id/followers')
  async getFollowers(@Param('id', ParseIntPipe) id: number) {
    const followers = await this.usersService.getFollowers(id);
    return followers.map((user) => new UserEntity(user));
  }

  @Get(':id/following')
  async getFollowing(@Param('id', ParseIntPipe) id: number) {
    const following = await this.usersService.getFollowing(id);
    return following.map((user) => new UserEntity(user));
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Req() req: any) {
    const deletion = await this.usersService.remove(req.user.id);
    return deletion;
  }
}
