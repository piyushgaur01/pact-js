const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

const controller = require('../asset/asset.controller');

// Setup provider server to verify
const app = require('express')();
app.use(require('../asset/asset.routes'));
const server = app.listen("8080");

describe("Pact Verification", () => {
    it("validates the expectations of AMMService", () => {
        const opts = {
            logLevel: "INFO",
            providerBaseUrl: "http://10.16.14.56:8080",
            provider: "AmmService",
            providerVersion: "1.0.0",
            pactUrls: [
                path.resolve(__dirname, '../../de/pacts/data-explorer-asset-model-manager.json')
            ],
            stateHandlers: {
                "no assets exist": () => {
                    controller.repository.assets = new Map();
                }
            }
        };

        return new Verifier(opts).verifyProvider().then(output => {
            console.log(output);
            done();
        }).finally(() => {
            server.close();
            done();
        });
    })
});