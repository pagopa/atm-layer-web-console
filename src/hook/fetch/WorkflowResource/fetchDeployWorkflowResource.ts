import fetch from "../../useFetch";

const fetchDeployWorkflowResource = ({abortController,  URL}:any) => async () => {
	const fetchCreationWorkFlow= fetch();
	const data = await fetchCreationWorkFlow({urlEndpoint: URL, method: "POST", abortController});
	return data;
};

export default fetchDeployWorkflowResource;