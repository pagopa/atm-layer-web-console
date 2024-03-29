
export type BpmnDto = {
    file?: File;
    filename: string;
    functionType: string;
};

export type UpgradeBpmnDto = {
    uuid?: string;
    file?: File;
    filename?: string;
    functionType?: string;
};

export type DeployBpmnDto = {
    uuid?: string;
    version?: number;
};

export type TerminalDto = {
  templateId?: string;
  templateVersion?: number;
  terminalIds?: Array<string>;
};

export type BranchConfigDto = {
  branchId?: string;
  branchDefaultTemplateId?: string;
  branchDefaultTemplateVersion?: number;
  terminals?: Array<TerminalDto>;
};

export type AssociateBpmnBodyDto = {
    defaultTemplateId?: string;
    defaultTemplateVersion?: number;
    branchesConfigs?: Array<BranchConfigDto>;
};

export type AssociateBpmnDto = {
  acquirerId?: string;
  functionType?: string;
  body?: AssociateBpmnBodyDto;
};

export type DeleteBpmnDto = {
    bpmnid?: string;
    version?: number;
};