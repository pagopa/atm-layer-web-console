export type ResourcesDto = {
    file: string;
    filename: string;
    resourceType: string;
    path: string;
};

export type ResourcesUpdateDto = {
    uuid: string;
    file: string;
};