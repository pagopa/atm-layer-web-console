export type WorkflowResourceDto = {
    file: string;
    fileName: string;
    resourceType: string;
};

export type WRUpdateDto = {
    uuid: string;
    file: string;
};

export type WRDeployDto = {
    uuid:string;
};

export type WRRollbackDto = {
    uuid:string;
};