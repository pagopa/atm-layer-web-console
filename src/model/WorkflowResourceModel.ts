export type WorkflowResourceDto = {
    file: string;
    filename: string;
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