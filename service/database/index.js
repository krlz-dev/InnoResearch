/**Create db schema**/
const Pool = require("pg").Pool;

let pgSchemas = [];

const schemaName = "inno_schema";
const postgresUser = "innopolis";
const postgresPass = "innopolis";
const postgresDb = "db_innopolis";
const host = "dbInnopolis";
const port ="5432"

const pool = new Pool({
  user: postgresUser,
  host: host,
  database: postgresDb,
  password: postgresPass,
  port: port
});

//we should connect here

const schemaCodes = {
  "25007": "schema_and_data_statement_mixing_not_supported",
  "3F000": "invalid_schema_name",
  "42P06": "duplicate_schema",
  "42P15": "invalid_schema_definition",
  "42000": "syntax_error_or_access_rule_violation",
  "42601": "syntax_error",
  "28P01": "wrong user or password",
  "ENOTFOUND": "wrong host connection"
};

exports.createSchema = async () => {

  let createSql = `CREATE SCHEMA IF NOT EXISTS ${schemaName} AUTHORIZATION ${postgresUser};`;
  await pool.query(createSql, (createErr, createRes) => {
    if (createErr) {
      console.log("ERROR code:", createErr.code);
      console.log("ERROR detail:", schemaCodes[createErr.code]);
    }
    if (createRes) {
      let createTableSql = `CREATE TABLE IF NOT EXISTS ${schemaName}
      .fhir_resources(id SERIAL primary key, patient_id VARCHAR , bundle JSONB);`;
      pool.query(createTableSql, (tableErr, _) => {
        if (tableErr) {
          console.log(`CREATE TABLE ERROR:`, tableErr.code, "-",schemaCodes[tableErr.code]);
          console.log("createTableSql:", tableErr);
        }
      });
    }
  });
}
//
//
// exports.storeBundle = (patientId, bundle) => {
//   pool.query(`INSERT INTO fhir_resources(patient_id, bundle) VALUES(${patientId}, ${bundle}) RETURNING *`);
// };