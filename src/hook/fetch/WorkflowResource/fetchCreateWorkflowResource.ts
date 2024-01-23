import fetch from "../../useFetch";

const fetchCreateWorkflowResource = ({abortController, body}:any) => async () => {
	const fetchCreationWorkFlow= fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchCreationWorkFlow({urlEndpoint: "/workflow-resource", method: "POST", body, abortController});
	return data;
};

export default fetchCreateWorkflowResource;