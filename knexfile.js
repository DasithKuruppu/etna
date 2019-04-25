// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABAS_EHOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME
    }
  }
};
