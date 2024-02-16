import fetch from "../../useFetch";

const fetchRollbackWorkflowResource = ({abortController, body, URL}:any) => async () => {
	const fetchFromServer= fetch();
	const data = await fetchFromServer({urlEndpoint: URL, method: "PUT", body, abortController});
	return data;
};

export default fetchRollbackWorkflowResource;