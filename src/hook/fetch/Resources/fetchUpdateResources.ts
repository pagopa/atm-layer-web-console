import fetch from "../../useFetch";

const fetchUpdateResources = ({abortController, body, URL}:any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: URL, method: "PUT", body, abortController });
	return data;
};
 
export default fetchUpdateResources;