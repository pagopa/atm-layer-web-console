import fetch from "../../useFetch";

const fetchRollbackWorkflowResource = ({abortController, body}:any, uuid: string) => async () => {
	const fetchFromServer= fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({urlEndpoint: `/workflow-resource/rollback/${uuid}`, method: "PUT", body, abortController});
	return data;
};

export default fetchRollbackWorkflowResource;