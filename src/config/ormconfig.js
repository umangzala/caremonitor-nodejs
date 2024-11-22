const ormConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "care_monitor_db",
  entities: ["src/entity/**/*.js"],
  synchronize: true,
  logging: false,
};

export default ormConfig;
