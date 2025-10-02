import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTableDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}

export class UpdateTableDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;
} 