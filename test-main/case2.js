async function foo() {
    let result, connection;
    try {
        connection = await connect();
        result = connection.send(1);
    } catch(err) {
        console.error(err.message);
    } finally {
        if (connection) {
            connection.close();
        }
        return result; // Noncompliant: Jump statement 'return' in the 'finally' block
    }
}