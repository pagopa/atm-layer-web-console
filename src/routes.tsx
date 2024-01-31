// export const BASE_ROUTE = "http://pagopa-dev-atm-layer-frontend-486872590.eu-south-1.elb.amazonaws.com";

const ROUTES = {
	HOME: "/home",
	WARNING_CODE: "/warning-code",
	ERROR_PAGE: "/error",
	BPMN: "/bpmn",
	RESOURCES: "/resources",
	WORKFLOW_RESOURCES: "/workflow_resources",
	BPMN_DETAILS: "/bpmnId/:bpmnId/modelVersion/:modelVersion"
};
// const ROUTES = {
// 	HOME: "home",
// 	WARNING_CODE: "warning-code",
// 	ERROR_PAGE: "error",
// 	BPMN: "bpmn",
// 	RESOURCES: "resources",
// 	WORKFLOW_RESOURCES: "workflow_resources",

export default ROUTES;
