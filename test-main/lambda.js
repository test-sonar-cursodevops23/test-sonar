module.exports = ({ repositories, managers, response }) => ({
  getClient: async (event) => {
    let Client;
    let closeConnection;

    try {
      console.debug(`event: ${JSON.stringify(event, null, 2)}`);

      managers.client.validateGetClientRequiredParams(event);

      ({ Client, closeConnection } = await repositories());

      const client = await Client.getClient(event);
      managers.client.validateExistsClient(client);

      return response.success(client, 200, null);
    } catch (error) {
      console.error(error);
      let customError;
      if (error.customError) {
        customError = error.getData();
      } else {
        const databaseError = managers.client.handlersDatabaseError(error);
        customError = databaseError.getData();
      }
      return response.error(
        customError.metadata,
        customError.msg,
        customError.code,
        customError.type,
        customError.httpStatus,
      );
    } finally {
      if (closeConnection) {
        closeConnection();
      }
    }
  },
});

