

import fetch from "../../useFetch";

const fetchUpgradeResources = ({abortController, body}:any, uuid: string) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: `/resources/${uuid}`, method: "PUT", body, abortController });
	return data;
};
 
export default fetchUpgradeResources;