const client = new MongoClient(mongoURI);
async function run() {
    const database = client.db('example');
    const products = database.collection('product');
    const query = { $where: `isString(this.${req.query.prop})`};
    const product = await products.findOne(query); // Noncompliant
}
run().catch(console.dir);


import {aws_apigateway as apigateway} from "aws-cdk-lib"

const resource = api.root.addResource("example")
resource.addMethod(
    "GET",
    new apigateway.HttpIntegration("https://example.org"),
    {
        authorizationType: apigateway.AuthorizationType.NONE // Sensitive
    }
)