/**Create db schema**/
const Pool = require("pg").Pool;
const schemaName = "inno_schema";
let pgSchemas = [];
const postgresRole = "inno_role";

const pool = new Pool({
  user: postgresRole,
  host: "innopolis",
  database: "db_innopolis",
  password: "innopolis",
  port: "5432"
});

const schemaCodes = {
  "25007": "schema_and_data_statement_mixing_not_supported",
  "3F000": "invalid_schema_name",
  "42P06": "duplicate_schema",
  "42P15": "invalid_schema_definition",
  "42000": "syntax_error_or_access_rule_violation",
  "42601": "syntax_error"
};

exports.schemaFuncs = async () => {
  // Declare a string for the Pool's query
  // let selectSchemasSql = `SELECT ${schemaName} FROM information_schema.schemata;`;
  // await pool.query(selectSchemasSql, (err, res) => {
  //   // Log the SQL statement to console
  //   console.log("\nselectSchemasSql:", selectSchemasSql);
  //
  //   // Check for Postgres exceptions
  //   if (err) {
  //     console.log(`SELECT ${schemaName}:`, schemaCodes[err.code]);
  //     console.log("ERROR code:", err.code);
  //   } else if (res.rows !== undefined) {
  //     // Iterate over the rows of Postgres schema names
  //     res.rows.forEach(row => {
  //       // Push the schema's name to the array
  //       pgSchemas.push(row.schema_name);
  //     });
  //
  //     // Log the number of Postgres schema names to console
  //     console.log("schema names:", pgSchemas);
  //     console.log("SELECT schema_name total schemas:", res.rowCount);
  //   }
  // });

  // Create the SCHEMA with user auth if it doesn't exist
  let createSql = `CREATE SCHEMA IF NOT EXISTS
${schemaName} AUTHORIZATION ${postgresRole};`;

  // Log the SQL statement to console
  console.log("\ncreateSql:", createSql);
  await pool.query(createSql, (createErr, createRes) => {
    if (createErr) {
      console.log(
        "CREATE SCHEMA ERROR:",
        createErr.code,
        "--",
        schemaCodes[createErr.code]
      );
      console.log("ERROR code:", createErr.code);
      console.log("ERROR detail:", createErr.detail);
    }

    if (createRes) {
      console.log("\nCREATE SCHEMA RESULT:", createRes.command);

      let createTableSql = `CREATE TABLE ${schemaName}.questionnaire_table(
                                                        id INT primary key,
                                                        patient_id VARCHAR,
                                                        bundle JSONB
                                                        );`;

      console.log("\ncreateTableSql:", createTableSql);

      pool.query(createTableSql, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createTableSql:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
    }
  });
}