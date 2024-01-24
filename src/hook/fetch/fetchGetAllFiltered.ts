import fetch from "../useFetch";

const fetchGetAllFiltered = ({ abortController, pageIndex, pageSize, ...headerParams }: any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);

	const data = await fetchFromServer({
		urlEndpoint: "/bpmn/filter",
		method: "GET",
		body: null,
		abortController,
		pageIndex,
		pageSize,
		headers: {
			"bpmnId": headerParams.bpmnId || "",
			"camundaDefinitionId": headerParams.camundaDefinitionId || "",
			"createdAt": headerParams.createdAt || "",
			"createdBy": headerParams.createdBy || "",
			"definitionKey": headerParams.definitionKey || "",
			"definitionVersionCamunda": headerParams.definitionVersionCamunda || "",
			"deployedFileName": headerParams.deployedFileName || "",
			"deploymentId": headerParams.deploymentId || "",
			"functionType": headerParams.functionType || "",
			"lastUpdatedAt": headerParams.lastUpdatedAt || "",
			"lastUpdatedBy": headerParams.lastUpdatedBy || "",
			"modelVersion": headerParams.modelVersion || "",
			"resource": headerParams.resource || "",
			"sha256": headerParams.sha256 || "",
			"status": headerParams.status || "",
		},
	});

	return data;
};

export default fetchGetAllFiltered;