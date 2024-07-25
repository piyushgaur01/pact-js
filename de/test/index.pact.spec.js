const path = require('path');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const { MatchersV3, PactV3, SpecificationVersion } = require('@pact-foundation/pact');
const chai = require('chai');
const DE = require('../index');
const { eachLike, like } = MatchersV3;
const { expect } = chai;

chai.use(require('chai-like'));
chai.use(require('chai-things')); // Don't swap these two

chai.use(deepEqualInAnyOrder);

const provider = new PactV3({
    consumer: 'data-explorer',
    provider: 'asset-model-manager',
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "warn",
    dir: path.resolve(process.cwd(), "pacts"),
    spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
    host: "127.0.0.1"
});

describe('AMM API Pact test', () => {
    describe('getting all assets', () => {
        it('should return all assets', async () => {
            // setup pact interaction
            await provider.addInteraction({
                states: [{ description: 'assets exist' }],
                uponReceiving: 'get all assets',
                withRequest: {
                    method: 'GET',
                    path: '/assets',
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: eachLike({
                        "id": 8397,
                        "name": "INC001",
                        "assetModelId": 16,
                        "sourceId": "/JHANSI/CTR/SWTGR/INC01",
                        "rootAssetId": 8213
                    }),
                },
            });

            await provider.executeTest(async (mockService) => {
                const de = new DE(mockService.url);
        
                // make request to Pact mock server
                const result = await de.getAssets();
                expect(result).to.be.an('array');
              });
        })
    })
    describe('get Assets By Id', () => {
        it('asset 8213 exists', async () => {
            const asset = {
                "id": 8213,
                "name": "JHANSI",
                "assetModelId": 7,
                "sourceId": "JHANSI",
                "rootAssetId": 8213
            };
            // setup pact interaction
            await provider.addInteraction({
                states: [{ description: 'asset exists' }],
                uponReceiving: 'a request for asset 8213',
                withRequest: {
                    method: 'GET',
                    path: '/asset/8213',
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    body: like(asset),
                },
            });

            await provider.executeTest(async (mockService) => {
                const de = new DE(mockService.url);

                // make request to Pact mock server
                const result = await de.getAssetWithId(8213);
                expect(asset).to.deep.equalInAnyOrder(result);

            });
        });
    });
});