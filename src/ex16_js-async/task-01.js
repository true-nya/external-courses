function fetchSimilarity(url, options = { method: 'GET', headers: null, body: null }) {
    const xhr = new XMLHttpRequest();
    jsonFunc = function () {
        return JSON.parse(this)
    }
    const promise = new Promise((resolve, reject) => {
        xhr.open(options.method, url, false);
        if (options.method === 'GET' && options.headers === null && options.body === null) {
            xhr.send();
        }
        else {
            if (options.headers) {
                for (const key in options.headers) {
                    if (options.headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, options.headers[key])
                    }
                }
            }
            xhr.send(options.body);
        }
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.responseText)
        }
        else {
            reject(xhr.status + ': ' + xhr.statusText);
        }
    });
    return promise
}
