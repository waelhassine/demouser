import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const users = service.findAll();
      expect(users).toBeInstanceOf(Array);
      expect(users.length).toBeGreaterThan(0);
    });

    it('should return a paginated list of users', () => {
      const users = service.findAll();
      expect(users.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', () => {
      const user = service.findOne('1');
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
    });

    it('should throw NotFoundException if user not found', () => {
      expect(() => service.findOne('999')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        adress_home: '123 Main St',
        adress_work: '456 Work Ave',
      };
      const user = service.create(createUserDto);
      expect(user).toBeDefined();
      expect(user.email).toBe(createUserDto.email);
    });

    it.only('should throw ConflictException if email already exists', () => {
      const createUserDto: CreateUserDto = {
        name: 'Jane Doe',
        email: 'wael.hassine@hotmail.com', // duplicate email
        adress_home: '123 Main St',
        adress_work: '456 Work Ave',
      };
      expect(() => service.create(createUserDto)).toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should update an existing user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const updatedUser = service.update('1', updateUserDto);
      expect(updatedUser).toBeDefined();
      expect(updatedUser.name).toBe(updateUserDto.name);
    });

    it('should throw NotFoundException if user not found', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      expect(() => service.update('999', updateUserDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing user', () => {
      const user = service.remove('1');
      expect(user).toBeDefined();
      expect(() => service.findOne('1')).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user not found', () => {
      expect(() => service.remove('999')).toThrow(NotFoundException);
    });
  });
});
