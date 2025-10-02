import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

const MAX_LIMIT = 100;

export class PaginationDto {
  @Transform(({ value }) => Number(value ?? 0))
  @IsInt()
  @Min(0)
  offset = 0;

  @Transform(({ value }) => {
    const n = Number(value ?? 10);
    if (!Number.isFinite(n)) return 10;
    return Math.min(Math.max(n, 1), MAX_LIMIT);
  })
  @IsInt()
  @Min(1)
  @Max(MAX_LIMIT)
  limit = 10;
} 