function fetchSimilarity(url, options = { method: 'GET', headers: null, body: null }) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open(options.method, url);
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
        if (xhr.status === 200) {
            resolve(xhr.responseText)
        }
        else {
            reject(xhr.status + ': ' + xhr.statusText);
        }
    });
}
