
export type BpmnDto = {
    file?: string;
    fileName?: string;
    functionType?: string;
};

export type UpgradeBpmnDto = {
    uuid?: string;
    file?: string;
    fileName?: string;
    functionType?: string;
};

export type DeployBpmnDto = {
    uuid?: string;
    version?: number;
};
