const INTERCEPT_BATCH = '/api/files/batch​';
const BATCH_API_PATH = '/file-batch-api';
const WAITING_TIME_MS = 3000;

function batchInterceptor(instance) {
    let requestedIDs = [];
    let batchPromise = false;
    let timeout;
    instance.interceptors.request.use(
        request => {
            if(request.url !== INTERCEPT_BATCH) return request;
            request.params.ids.forEach(requestedId => {
                if(!requestedIDs.includes(requestedId)) requestedIDs.push(requestedId);
            });;
            return {
                ...request,
                adapter: (config) => {
                    if(!batchPromise) batchPromise = new Promise((resolve) => {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            if(requestedIDs.length > 0) {
                                instance.get(BATCH_API_PATH, {
                                    params: {
                                        ids: requestedIDs,
                                    },
                                }).then(response => {
                                    clearTimeout(timeout);
                                    requestedIDs = [];
                                    batchPromise = false;
                                    resolve(response);
                                }).catch(error => {
                                    reject(error);
                                });
                            }
                        }, WAITING_TIME_MS);
                    });
                    return batchPromise.then(response => {
                        const items = response.data?.items.filter(({id}) => config.params.ids.includes(id)) ?? [];
                        if(items.length === 0) return Promise.reject('document-not-found');
                        return { 
                            ...response,
                            data: { items }
                        };
                    });
                },
            };
        }, 
        error => Promise.reject(error)
    );
}
    
export default batchInterceptor;