import fetch from "../../useFetch";

const fetchDownloadBpmn = ({abortController, URL}: any) => async () => {
	const fetchFromServer = fetch();
	const data = await fetchFromServer({ 
		urlEndpoint: URL, 
		method: "GET", 
		abortController
	});
	return data;
};
 
export default fetchDownloadBpmn;