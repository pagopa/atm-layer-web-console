import fetch from "../../useFetch";

const fetchCreateResources = ({abortController, body}:any) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: "/resources", method: "POST", body, abortController });
	return data;
};
 
export default fetchCreateResources;