import { Liquibase, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';

const myConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './lb-changelog.sql',
  url: 'jdbc:postgresql://localhost:65432/electricsql-app?sslmode=disable',
  username: 'postgres',
  password: 'proxy_password',
}
const instTs = new Liquibase(myConfig);
// console.warn(inst.status())
instTs.status();