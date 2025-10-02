export interface AppConfig {
  general: {
    isProduction: boolean;
    port: number;
  };
  database: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  typeorm: {
    logging: boolean;
  };
}

function toNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toBoolean(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  const normalized = value.toLowerCase();
  return normalized === 'true' ? true : normalized === 'false' ? false : fallback;
}

const config = (): AppConfig => ({
  general: {
    isProduction: process.env.NODE_ENV === 'production',
    port: toNumber(process.env.PORT, 3000),
  },
  database: {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: toNumber(process.env.POSTGRES_PORT, 5432),
    database: process.env.POSTGRES_DB ?? 'nest_ddd',
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  },
  typeorm: {
    logging: toBoolean(process.env.TYPEORM_LOGGING, false),
  },
});

export default config; 