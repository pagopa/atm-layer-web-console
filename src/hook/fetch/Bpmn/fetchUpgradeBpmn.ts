import fetch from "../../useFetch";

const fetchUpgradeBpmn = ({abortController, body}:any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: "/bpmn/upgrade", method: "POST", body, abortController });
	return data;
};
 
export default fetchUpgradeBpmn;