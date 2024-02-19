export const GET_ALL_BPMN_FILTER = "/bpmn/filter";
export const GET_ALL_WORKFLOW_RESOURCES_FILTER = "/workflow-resource/filter";
export const GET_ALL_RESOURCES_FILTER = "/resources/filter";
export const CREATE_BPMN = "/bpmn";
export const CREATE_WR = "/workflow-resource";
export const UPGRADE_BPMN_PATH = "/bpmn/upgrade";
export const GET_ALL_BPMN_ASSOCIATED = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const BPMN_ASSOCIATE = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const DELETE_ASSOCIATE_BPMN = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const BPMN_DEPLOY = "/bpmn/deploy/:bpmnId/version/:modelVersion";
export const BPMN_DELETE = "/bpmn/disable/:bpmnId/version/:modelVersion";
export const UPDATE_ASSOCIATE_BPMN = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const BPMN_DOWNLOAD = "/bpmn/downloadFrontEnd/:bpmnId/version/:modelVersion";
export const WR_UPDATE = "/workflow-resource/update/:workflowResourceId";
export const WR_ROLLBACK = "/workflow-resource/rollback/:workflowResourceId";
export const WR_DEPLOY = "/workflow-resource/deploy/:workflowResourceId";
export const WR_DOWNLOAD = "/workflow-resource/downloadFrontEnd/:workflowResourceId";
export const RESOURCES_UPDATE = "/resources/:resourceId";
export const RESOURCES_CREATE = "/resources";
export const WR_DELETE = "/workflow-resource/disable/:workflowResourceId";
