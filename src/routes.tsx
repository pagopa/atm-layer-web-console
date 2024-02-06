const ROUTES = {
	HOME: "/home",
	WARNING_CODE: "/warning-code",
	ERROR_PAGE: "/error",
	BPMN: "/bpmn",
	RESOURCES: "/resources",
	WORKFLOW_RESOURCES: "/workflow_resources",
	BPMN_DETAILS: "/bpmnId/:bpmnId/modelVersion/:modelVersion",
	CREATE_BPMN: "/bpmn/create",
	CREATE_WORKFLOW_RESOURCES: "/workflow_resources/create",
	LOGIN: "/login",
	LOGIN_BACK:"/login/callback",
	ASSOCIATE_BPMN: "/bpmn/associate",
	UPGRADE_BPMN: "/bpmn/upgrade/:bpmnId"
};
// const ROUTES = {
// 	HOME: "home",
// 	WARNING_CODE: "warning-code",
// 	ERROR_PAGE: "error",
// 	BPMN: "bpmn",
// 	RESOURCES: "resources",
// 	WORKFLOW_RESOURCES: "workflow_resources",

export default ROUTES;
