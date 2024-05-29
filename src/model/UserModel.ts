export type JwtUser = {
	id?:string;
    email?: string;
};

export type UserAction = {
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
};

export type RootLinkType = {
    element: JSX.Element;
    href?: string;
    ariaLabel: string;
    title: string;
};

export type Profile = {
        description: string;
        profileId: number;
        createdAt: string;
        lastUpdatedAt: string;
};

export type User = {
    userId: string;
    name:string;
    surname:string;
    createdAt: string;
    lastUpdatedAt: string;
    profiles: Array<Profile>;
};