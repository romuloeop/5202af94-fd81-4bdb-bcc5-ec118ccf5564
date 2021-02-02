const REDIRECT_REQUEST_URLS = {
    '/files/batch': '/file-batch-api',
}
function batchInterceptor(instance) {
    instance.interceptors.request.use(
        request => {
            console.log('Starting Request');
            return {
                ...request,
                withCredentials: true,
                url: REDIRECT_REQUEST_URLS[request.url] ?? request.url,
            };
            // Add your code herereturn request;
        }, 
        error => Promise.reject(error)
    );
}
    
export default batchInterceptor;