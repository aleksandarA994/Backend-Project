import mysql from 'mysql';
import mysqlConfigs from '../../config/mysql';

const dbConfig = mysqlConfigs['dev'];
const con = mysql.createConnection(dbConfig);


con.connect(() => {
  console.log('Database connection is on');
 
});

export default { con };