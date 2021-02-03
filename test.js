import apiClient from "./api/apiClient.js";
import axios from "axios";
// All requests should run at the same time and produce only one request
// to the backend. All requests should return or reject.
function runTest() {
    const batchUrl = "/file-batch-api";

    // Should return [{id:"fileid1"},{id:"fileid2"}]
    const request1 = apiClient.get(batchUrl, {params: {ids: ["fileid1","fileid2"]}});
    // Should return [{id:"fileid2"}]
    const request2 = apiClient.get(batchUrl, {params: {ids: ["fileid2"]}});
    // Should reject as the fileid3 is missing from the response
    const request3 = apiClient.get(batchUrl, {params: {ids: ["fileid3"]}});

    axios.all([request1, request2, request3]).then(axios.spread((...responses) => {
        console.log(responses);
        console.log(
            Object.values(responses
                .flat()
                .reduce((acc, item) => {
                    acc[item.id] = item;
                    return acc;
                }, {})));
    })).catch(error => {
        console.log(error);
    });
}

runTest();