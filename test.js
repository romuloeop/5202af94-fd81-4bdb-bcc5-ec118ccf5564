import apiClient from "./api/apiClient.js";
import axios from "axios";
// All requests should run at the same time and produce only one request
// to the backend. All requests should return or reject.
function runTest() {
    const batchUrl = "/api/files/batch​";

    // Should return [{id:"fileid1"},{id:"fileid2"}]
    apiClient.get(batchUrl, {params: {ids: ["fileid1","fileid2"]}}).then(({data}) => console.log(data));
    // Should return [{id:"fileid2"}]
    apiClient.get(batchUrl, {params: {ids: ["fileid2"]}}).then(({data}) => console.log(data));
    // Should reject as the fileid3 is missing from the response
    apiClient.get(batchUrl, {params: {ids: ["fileid3"]}}).then(({data}) => console.log(data)).catch(error => console.log(error));
}

runTest();