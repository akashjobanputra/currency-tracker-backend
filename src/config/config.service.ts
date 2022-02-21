import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  getValue(key: string, throwIfMissing = false): string {
    const value = this.env[key];
    if (!value && throwIfMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  get NODE_ENV() {
    return this.getValue('NODE_ENV');
  }

  get isProduction() {
    return this.NODE_ENV === 'production';
  }

  get isDev() {
    return this.NODE_ENV === 'development';
  }

  get autoSchemaFilePath() {
    return join(process.cwd(), 'src/schema.gpl');
  }

  get pgHost() {
    return this.getValue('PG_HOST');
  }

  get pgPort() {
    return parseInt(this.getValue('PG_PORT'));
  }

  get pgUsername() {
    return this.getValue('PG_USERNAME');
  }

  get pgPassword() {
    return this.getValue('PG_PASSWORD');
  }

  get pgDatabase() {
    return this.getValue('PG_DATABASE');
  }

  get ormConfig(): ConnectionOptions {
    return {
      type: 'postgres',
      host: this.pgHost,
      port: this.pgPort,
      username: this.pgUsername,
      password: this.pgPassword,
      database: this.pgDatabase,
      entities: ['dist/**/*.model.js'],
      synchronize: false,
    };
  }

  get jwtSecret() {
    return this.getValue('JWT_SECRET');
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'NODE_ENV',
  'JWT_SECRET',
]);

export { configService };
