import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  commanderId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  memberIds?: number[];
}

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  commanderId?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  memberIds?: number[];
}

export class CreateStaffDto {
  [key: string]: any;
}

