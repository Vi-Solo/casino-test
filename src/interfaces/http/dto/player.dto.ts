import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsUUID()
  tableId!: string;
}

export class UpdatePlayerDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @IsUUID()
  @IsOptional()
  tableId?: string;
} 