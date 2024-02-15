import fetch from "../../useFetch";

const fetchDeleteBpmn = ({abortController, URL}: any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({ urlEndpoint: URL, method: "POST", abortController });
	return data;
};
 
export default fetchDeleteBpmn;