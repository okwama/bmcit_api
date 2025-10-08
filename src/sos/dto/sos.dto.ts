import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSosDto {
  @IsString()
  @IsOptional()
  sos_type?: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  @IsOptional()
  comment?: string;
}

export class UpdateSosDto {
  @IsString()
  @IsOptional()
  sos_type?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  comment?: string;
}

