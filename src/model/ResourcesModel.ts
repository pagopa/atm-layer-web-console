export type ResourcesListDto = {
    resources: Array<ResourcesDto>;
};

export type ResourcesDto = {
    fileArray?: Array<File>;
    filenames?: Array<string>;
    resourceType: string;
    path?: string;
    description?: string;
};

export type ResourceDto = {
    file: File;
    filename: string;
    resourceType: string;
    path?: string;
    description?: string;
};

export type ResourcesUpdateDto = {
    file?: File;
    uuid: string;  
};

export type ResourcesDeleteDto = {
    uuid: string;
};