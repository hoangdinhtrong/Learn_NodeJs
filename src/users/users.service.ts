import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "dan",
            "email": "dan@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "toy",
            "email": "toy@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 3,
            "name": "troy",
            "email": "troy@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 4,
            "name": "please",
            "email": "please@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "hoho",
            "email": "hoho@gmail.com",
            "role": "ADMIN"
        },
    ];

    findAll() {
        return this.users;
    }

    paging(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role)
            return this.users.filter(us => us.role === role);
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(us => us.id === id);
        if(!user) throw new NotFoundException('User not found');

        return user;
    }

    create(user: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newuser = {
            id: usersByHighestId[0].id + 1,
            ...user
        };
        this.users.push(newuser);
        return newuser;
    }

    update(id: number, userUpdate: UpdateUserDto) {
        this.users = this.users.map(us => {
            if (us.id === id)
                return { ...us, ...userUpdate };
            return us;
        });

        return this.findOne(id);
    }

    delete(id: number) {
        const removeUser = this.findOne(id);

        this.users = this.users.filter(us => us.id !== id);

        return removeUser;
    }
}
