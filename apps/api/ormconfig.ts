import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.APP_NAMHAE_LIFE_DB_HOST,
  port: process.env.APP_NAMHAE_LIFE_DB_PORT ? parseInt(process.env.APP_NAMHAE_LIFE_DB_PORT) : 5432,
  username: process.env.APP_NAMHAE_LIFE_DB_USERNAME,
  password: process.env.APP_NAMHAE_LIFE_DB_PASSWORD,
  database: process.env.APP_NAMHAE_LIFE_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/management/migration/*.js'],
  cli: {
    migrationsDir: 'management/migration',
  },
  synchronize: true,
}

export default config
