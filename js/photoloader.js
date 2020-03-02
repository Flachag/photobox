let server;

export function request(endpoint) {
    return axios.request({
        url: server + endpoint,
        method: 'GET',
        responseType: 'json'
    }).catch(error => {
        console.log(error.response)
    });
}

export function initLoader(server_url) {
    server = server_url;
}