import { Body, Controller, Delete, Get, Param, 
    ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get() // GET /users
    findAll() {
        return this.usersService.findAll();
    }

    @Get() // GET /users
    paging(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.paging(role);
    }

    @Get('interns') //GET /users/interns
    findAllInterns() {
        return [];
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.usersService.create(user);
    }

    @Patch(':id') //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {
        return this.usersService.update(id, userUpdate);
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
