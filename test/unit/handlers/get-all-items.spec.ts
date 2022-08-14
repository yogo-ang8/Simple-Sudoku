// Import all functions from get-all-items.js 
const lambda = require("../../../src/handlers/get-all-items").getAllItemsHandler;
// Import dynamodb from aws-sdk 
import dynamodb from 'aws-sdk/clients/dynamodb';

const expect = require("chai").expect;
import sinon from "sinon";

// This includes all tests for getAllItemsHandler()
describe('Test getAllItemsHandler', () => {
    let sinonSandbox;
    // Test one-time setup and teardown
    beforeEach((done) => {
        sinonSandbox = sinon.createSandbox();
        done();
    });

    // Clean up mocks
    afterEach((done) => {
        sinonSandbox.restore()
        done();
    })

    it('should return ids', async () => {
        const items = [{ id: 'id1' }, { id: 'id2' }];
        // Return the specified value whenever the stub scan function is called
        sinonSandbox.stub(dynamodb.DocumentClient.prototype, 'scan').returns({
            promise: function () {
                return Promise.resolve({ Items: items });
            }
        });

        const event = {
            httpMethod: 'GET'
        }

        // Invoke From Lambda Handler()
        const result = await lambda(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(items)
        };

        // Compare the result with the expected result
        expect(result.statusCode).equal(expectedResult.statusCode);
        expect(result.body).equal(expectedResult.body);
    });
});
