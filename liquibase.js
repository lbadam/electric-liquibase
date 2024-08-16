import { Liquibase, POSTGRESQL_DEFAULT_CONFIG } from 'liquibase';

const myConfig = {
  ...POSTGRESQL_DEFAULT_CONFIG,
  changeLogFile: './lb-changelog.sql',
  url: 'jdbc:postgresql://localhost:54321/electric',
  username: 'postgres',
  password: 'password',
}
const instTs = new Liquibase(myConfig);
// console.warn(inst.status())
//instTs.status();

instTs.update();