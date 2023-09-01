const { getRepositories } = require('prodig-repositories');
const { getConfigSecret } = require('prodig-aws-configs');

const initRepos = async () => {
  const awsConfig = { region: process.env.AWS_REGION };
  const configTable = `${process.env.ENVIRONMENT.toLowerCase()}Configs`;
  const config = await getConfigSecret(
    configTable,
    process.env.AWS_LAMBDA_FUNCTION_NAME,
    awsConfig
  );
  return getRepositories(config);
};

module.exports = initRepos;
