export type ResourcesDto = {
    file?: File;
    filename: string;
    resourceType: string;
    path?: string;
};

export type ResourcesUpdateDto = {
    uuid: string;
    file?: File;
};