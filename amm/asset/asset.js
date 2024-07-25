class Asset {
    constructor(
        id,
        name,
        assetModelId,
        sourceId,
        rootAssetId
    ) {
        this.id = id;
        this.name = name;
        this.assetModelId = assetModelId;
        this.sourceId = sourceId;
        this.rootAssetId = rootAssetId;
    }
}

module.exports = Asset;