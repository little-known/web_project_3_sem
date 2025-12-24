import {
  IsString,
  IsArray,
  IsNumber,
  IsUrl,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsUrl()
  coverImage: string;

  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMinSize(1)
  screenshots: string[];

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  platforms: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  genres: string[];

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsString()
  releaseDate: string;
}
