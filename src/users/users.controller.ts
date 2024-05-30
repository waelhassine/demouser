import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}
  @Get()
  findAll() {
    return this.usersServices.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersServices.findOne(id);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersServices.create(createUserDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersServices.update(id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersServices.remove(id);
  }
}
