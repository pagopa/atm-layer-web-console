import fetch from "../../useFetch";

const fetchDeployWorkflowResource = ({abortController, body, URL}:any) => async () => {
	const fetchCreationWorkFlow= fetch();
	const data = await fetchCreationWorkFlow({urlEndpoint: URL, method: "POST", body, abortController});
	// const fetchDeployWorkflowResource = ({abortController,  URL}:any) => async () => {
	// 	const fetchCreationWorkFlow= fetch();
	// 	const data = await fetchCreationWorkFlow({urlEndpoint: URL, method: "POST", abortController});
	return data;
};

export default fetchDeployWorkflowResource;