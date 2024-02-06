export type WorkflowResourceDto = {
    file?: File;
    filename: string;
    resourceType: string;
};

export type WRUpdateDto = {
    uuid: string;
    file?: File;
};

export type WRDeployDto = {
    uuid:string;
};

export type WRRollbackDto = {
    uuid:string;
};