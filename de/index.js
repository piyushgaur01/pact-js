const axios = require('axios').default;

class API {

    constructor(url) {
        if (url === undefined || url === "") {
            url = 'http://localhost:3000';
        }
        if (url.endsWith("/")) {
            url = url.substr(0, url.length - 1)
        }
        this.url = url
    }

    withPath(path) {
        if (!path.startsWith("/")) {
            path = "/" + path
        }
        return `${this.url}${path}`
    }

    async getAssets() {
        return axios.get(this.withPath('/assets'))
            .then(r => r.data);
    }

    async getAssetWithId(assetId) {
        return axios.get(this.withPath(`/asset/${assetId}`))
            .then(r => r.data);
    }
}

module.exports = API;
// export default new API('http://localhost:3000');