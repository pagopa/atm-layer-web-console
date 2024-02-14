import fetch from "../../useFetch";

const fetchDownloadBpmn = ({abortController, URL}: any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ 
		urlEndpoint: URL, 
		method: "GET", 
		abortController
	});
	return data;
};
 
export default fetchDownloadBpmn;