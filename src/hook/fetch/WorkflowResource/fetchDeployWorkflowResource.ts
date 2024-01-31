import fetch from "../../useFetch";

const fetchDeployWorkflowResource = ({abortController, body}:any, uuid: string) => async () => {
	const fetchCreationWorkFlow= fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchCreationWorkFlow({urlEndpoint: `/workflow-resource/deploy/${uuid}`, method: "POST", body, abortController});
	return data;
};

export default fetchDeployWorkflowResource;