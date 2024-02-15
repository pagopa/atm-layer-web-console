import fetch from "../../useFetch";

const fetchDeployWorkflowResource = ({abortController, body, URL}:any) => async () => {
	const fetchCreationWorkFlow= fetch();
	const data = await fetchCreationWorkFlow({urlEndpoint: URL, method: "POST", body, abortController});
	return data;
};

export default fetchDeployWorkflowResource;