const REDIRECT_REQUEST_URLS = {
    '/files/batch': '/file-batch-api',
    '/api/files/batch': '/file-batch-api',
};

function batchInterceptor(instance) {
    instance.interceptors.request.use(
        request => {
            return {
                ...request,
                withCredentials: true,
                url: REDIRECT_REQUEST_URLS[request.url] ?? request.url,
            };
        }, 
        error => Promise.reject(error)
    );
    instance.interceptors.response.use(({data, status}) => {
        if(data.items.length === 0 || status !== 200) return Promise.reject('document-not-found');
        return data.items;
    },
    (error) => Promise.reject(error));
}
    
export default batchInterceptor;