let server;

export function request(endpoint) {
    return axios.request({
        url: server + endpoint,
        headers:  {
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'GET',
        responseType: 'json'
    });
}

export function initLoader(server_url) {
    server = server_url;
}