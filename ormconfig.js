module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.POSTGRE_PORT,
  username: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASS,
  database: process.env.POSTGRE_DATABASE,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/entities/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities',
  },
};
