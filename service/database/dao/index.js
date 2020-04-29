const Client = require("pg").Client;
const schemaName = "inno_schema";
const postgresUser = "innopolis";
const postgresPass = "innopolis";
const postgresDb = "db_innopolis";
const host = "dbInnopolis";
const port = "5432"

const client = new Client({
  connectionString: `postgres://${postgresUser}:${postgresPass}@${host}:${port}/${postgresDb}`
})
client.connect()
exports.storeBundle = async (patientId, bundle) => {
  let request = await client.query(`INSERT INTO ${schemaName}.fhir_resources(patient_id, bundle) VALUES('${patientId}', '${bundle}') RETURNING *`)
  return request.command
};