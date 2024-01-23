import fetch from "../../useFetch";

const endpoint="http://localhost:3003/api/v1/model";
const urlEndpoint = "/workflow-resource";

const fetchCreate = ({abortController, body}:any) => async () => {
	const fetchCreationWorkFlow= fetch(endpoint);
	const data = await fetchCreationWorkFlow({urlEndpoint, method: "POST", body, abortController});
	return data;
};

export default fetchCreate;