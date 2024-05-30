import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'wael hassine',
      email: 'wael.hassine@hotmail.com',
      adress_home: '93 rue marseille mahdia',
      adress_work: '95 rue test',
    },
  ];

  /**
   * Retrieve a list of users.
 
   * @returns {User[]} Array of users.
   */
  findAll(): User[] {
    return this.users;
  }

  /**
   * Retrieve a single user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {User} The user with the specified ID.
   * @throws {NotFoundException} If no user is found with the specified ID.
   */
  findOne(id: string): User {
    const user = this.users.find((item) => item.id === +id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  /**
   * Create a new user.
   * @param {CreateUserDto} createUserDto
   * @returns {User} The newly created user.
   * @throws {ConflictException} If a user with the same email already exists.
   */
  create(createUserDto: CreateUserDto): User {
    const emailExists = this.users.some(
      (user) => user.email === createUserDto.email,
    );
    if (emailExists) {
      throw new ConflictException('Email already in use');
    }

    const newUser: User = {
      id: this.users.length ? this.users[this.users.length - 1].id + 1 : 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  /**
   * Update an existing user by ID.
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} updateUserDto
   * @returns {User} The updated user.
   * @throws {NotFoundException} If no user is found with the specified ID.
   */
  update(id: string, updateUserDto: UpdateUserDto): User {
    const existingUser = this.findOne(id);
    if (existingUser) {
      const index = this.users.findIndex((user) => user.id === +id);
      const updatedUser = { ...existingUser, ...updateUserDto };
      this.users[index] = updatedUser;
      return updatedUser;
    }
  }

  /**
   * Remove a user by ID.
   * @param {string} id - The ID of the user to remove.
   * @returns {User} The removed user.
   * @throws {NotFoundException} If no user is found with the specified ID.
   */
  remove(id: string): User {
    const userIndex = this.users.findIndex((item) => item.id === +id);
    if (userIndex >= 0) {
      const [deletedUser] = this.users.splice(userIndex, 1);
      return deletedUser;
    } else {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
