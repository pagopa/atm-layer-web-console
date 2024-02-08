import fetch from "../../useFetch";

const fetchDeleteBpmn = ({abortController, URL}: any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: URL, method: "POST", abortController });
	return data;
};
 
export default fetchDeleteBpmn;