const sequelize = require('./database');

async function inspect() {
  try {
    const [results] = await sequelize.query('SHOW TABLES');
    console.log('Tables:', results);
    for (const row of results) {
       const tableName = Object.values(row)[0];
       const [columns] = await sequelize.query(`DESCRIBE ${tableName}`);
       console.log(`Structure for ${tableName}:`, columns);
    }
  } catch (err) {
    console.error('Inspection failed:', err);
  } finally {
    await sequelize.close();
  }
}

inspect();
