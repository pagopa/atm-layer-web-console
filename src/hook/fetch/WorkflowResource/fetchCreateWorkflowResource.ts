import { CREATE_WR } from "../../../commons/endpoints";
import fetch from "../../useFetch";

const fetchCreateWorkflowResource = ({abortController, body}:any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({urlEndpoint: CREATE_WR, method: "POST", body, abortController});
	return data;
};

export default fetchCreateWorkflowResource;