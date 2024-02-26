export type ResourcesDto = {
    file?: File;
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