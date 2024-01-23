import fetch from "../../useFetch";
 
const urlEndpoint = "/bpmn";
const mockedEndpoint = "http://localhost:3003/api/v1/model";

const fetchCreateBpmn = ({abortController, body}:any) => async () => {
	const fetchFromServer = fetch(mockedEndpoint);
	const data = await fetchFromServer({ urlEndpoint, method: "POST", body, abortController });
	return data;
};
 
export default fetchCreateBpmn;