
import { CREATE_BPMN } from "../../../commons/endpoints";
import fetch from "../../useFetch";

const fetchCreateBpmn = ({abortController, body}:any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({ urlEndpoint: CREATE_BPMN, method: "POST", body, abortController});
	return data;
};
 
export default fetchCreateBpmn;