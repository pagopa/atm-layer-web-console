/* eslint-disable indent */
export type Option = {
    label: string;
    onClick: () => void;
};

export type Options = {
    id: string;
    options: Array<Option>;
};

export const menuOptionsButton: Array<Options> = [
    {
        id: "bpmn",
        options: [
            {
                label: "BPMN GetAll",
                onClick: () => console.log("BPMN GetAll clicked!")
            },
            {
                label: "BPMN Create",
                onClick: () => console.log("BPMN Create clicked!")
            },
            {
                label: "BPMN Upgrade",
                onClick: () => console.log("BPMN Upgrade clicked!")
            },
            {
                label: "BPMN Deploy",
                onClick: () => console.log("BPMN Upgrade clicked!")
            },
            {
                label: "BPMN Delete",
                onClick: () => console.log("BPMN Delate clicked!")
            },
            {
                label: "BPMN Associate",
                onClick: () => console.log("BPMN Upgrade clicked!")
            },
            {
                label: "BPMN Download",
                onClick: () => console.log("BPMN create clicked!")
            }
        ]
    },
    {
        id: "resources",
        options: [
            {
                label: "Resources GetAll",
                onClick: () => console.log("Resources GetAll clicked!")
            },
            {
                label: "Resources Create",
                onClick: () => console.log("Resources Create clicked!")
            },
            {
                label: "Resources Update",
                onClick: () => console.log("Resources Upgrade clicked!")
            },
        ]
    },
    {
        id: "workflow",
        options: [
            {
                label: "WorkFlow Resource GetAll",
                onClick: () => console.log("WorkFlow Resource GetAll clicked!")
            },
            {
                label: "WorkFlow Resource Create",
                onClick: () => console.log("WorkFlow Resource Create clicked!")
            },
            {
                label: "WorkFlow Resource Update",
                onClick: () => console.log("WorkFlow Resource Update clicked!")
            },
            {
                label: "WorkFlow Resource Deploy",
                onClick: () => console.log("WorkFlow Resource Deploy clicked!")
            },
            {
                label: "WorkFlow Resource Delete",
                onClick: () => console.log("WorkFlow Resource Delete clicked!")
            },
            {
                label: "WorkFlow Resource RollBack",
                onClick: () => console.log("WorkFlow Resource Rollback clicked!")
            },
        ]
    },
];

export 	const filterOptionsByLabel = (inputLabel: string): Array<Options> =>
// filter option for label
menuOptionsButton.filter((optionsGroup, i) => {
    const firstOptionLabel = optionsGroup.options[i].label || "";
    return firstOptionLabel.includes(inputLabel);
});