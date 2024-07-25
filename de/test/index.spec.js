const nock = require('nock');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const expect = chai.expect;
const DE = require('../index');

chai.use(deepEqualInAnyOrder);

const de = new DE();

describe('DE', () => {
  it('get asset with id 8213', async () => {
    const asset = {
      "id": 8213,
      "name": "JHANSI",
      "assetModelId": 7,
      "sourceId": "JHANSI",
      "rootAssetId": 8213
    };
    nock('http://localhost:3000')
      .get('/asset/8213')
      .reply(200, asset, { 'Access-Control-Allow-Origin': '*' });
    const result = await de.getAssetWithId(8213);
    expect(asset).to.deep.equalInAnyOrder(result);
  })
})