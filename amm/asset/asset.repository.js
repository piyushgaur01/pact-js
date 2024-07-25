const Asset = require('./asset');

class AssetRepository {

    constructor() {
        this.assets = new Map([
            ["8213", new Asset(8213, "JHANSI", 7, "JHANSI", 8213)],
            ["8357", new Asset(8357, "OG01", 43, "/JHANSI/CTR/SWTGR/OG0112", 8213)],
            ["8397", new Asset(8397, "INC001", 16, "/JHANSI/CTR/SWTGR/INC01", 8213)],
        ]);
    }

    async fetchAll() {
        return [...this.assets.values()]
    }

    async getById(id) {
        return this.assets.get(id);
    }
}

module.exports = AssetRepository;
