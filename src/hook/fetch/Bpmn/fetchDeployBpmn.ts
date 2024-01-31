import fetch from "../../useFetch";

const fetchDeployBpmn = ({abortController, body}:any, uuid: string, version: number) => async () => {
	const fetchFromServer = fetch(process.env.REACT_APP_BACKEND_URL);
	const data = await fetchFromServer({ urlEndpoint: `/bpmn/deploy/${uuid}/version/${version}`, method: "POST", body, abortController });
	return data;
};
 
export default fetchDeployBpmn;