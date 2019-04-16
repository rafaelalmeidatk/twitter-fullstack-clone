module.exports = async function() {
  await global.__KNEX__.destroy();
};
