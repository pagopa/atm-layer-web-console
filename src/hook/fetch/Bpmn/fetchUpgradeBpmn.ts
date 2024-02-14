import fetch from "../../useFetch";

const fetchUpgradeBpmn = ({abortController, body, URL}:any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({ urlEndpoint: URL, method: "POST", body, abortController });
	return data;
};
 
export default fetchUpgradeBpmn;