import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly adress_home: string;
  @IsString()
  readonly adress_work: string;
}
