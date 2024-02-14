import React, { useState } from "react";
import { BPMN, WORKFLOW_RESOURCE } from "../../../commons/constants";
import ROUTES from "../../../routes";
import FilterTemplate from "./FilterTemplate";
import BpmnFilterComponent from "./BpmnFilterComponent";
import WRFilterComponent from "./WRFilterComponent";

type Props = {
	filterValues: any;
	setFilterValues: React.Dispatch<React.SetStateAction<any>>;
	setTableList: React.Dispatch<any>;
	getAllList: (filterValues?: any) => void;
	newFilterValues: any;
	driver: string;
};

export default function FilterBar({ filterValues, setFilterValues, getAllList, newFilterValues, driver }: Props) {

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
		switch (driver) {
		case BPMN:
			setFilterValues({ ...filterValues, [fieldName]: event.target.value });
			const filterBpmnWithoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
			if (
				event.target.name === "status" &&
					event.target.value === "" &&
					!(filterBpmnWithoutStatus.some((value => value[1] !== "")))
			) {
				getAllList();
			}
			break;
		case WORKFLOW_RESOURCE:
			setFilterValues({ ...filterValues, [fieldName]: event.target.value });
			const filterWfResWithoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
			const filterWithoutResourceType = Object.entries(filterValues).filter(el => el[0] !== "resourceType");

			const statusCondition = (event.target.name === "status" && event.target.value === "" && !(filterWfResWithoutStatus.some((value => value[1] !== ""))));
			const resourceCondition = (event.target.name === "resourceType" && event.target.value === "" && !(filterWithoutResourceType.some((value => value[1] !== ""))));
			if (statusCondition || resourceCondition) {
				getAllList();
			}
			break;
		}
	};

	const handleSubmit = () => {
		if (Object.values(filterValues).some(value => value !== "")) {
			getAllList(filterValues);
		}
	};

	const cleanFilter = () => {
		setFilterValues(newFilterValues);
		getAllList();
	};

	const menuItems = [
		{ label: "STATO", value: "" },
		{ label: "CREATED", value: "CREATED" },
		{ label: "WAITING_DEPLOY", value: "WAITING_DEPLOY" },
		{ label: "UPDATED_BUT_NOT_DEPLOYED", value: "UPDATED_BUT_NOT_DEPLOYED" },
		{ label: "DEPLOYED", value: "DEPLOYED" },
		{ label: "DEPLOY_ERROR", value: "DEPLOY_ERROR" },
	];

	const filterType = () => {
		switch (driver) {
		case BPMN:
			return <BpmnFilterComponent filterValues={filterValues} handleChange={handleChange} menuItems={menuItems} />;
		case WORKFLOW_RESOURCE:
			return <WRFilterComponent filterValues={filterValues} handleChange={handleChange} menuItems={menuItems} />;
		default:
			return <></>;
		}
	};

	const filterRoutes = () => {
		switch (driver) {
		case BPMN:
			return ROUTES.CREATE_BPMN;
		case WORKFLOW_RESOURCE:
			return ROUTES.CREATE_WR;
		default:
			return "/";
		}
	};

	return (
		<FilterTemplate handleSubmit={handleSubmit} cleanFilter={cleanFilter} filterValues={filterValues} filterRoutes={filterRoutes()}>
			{filterType()}
		</FilterTemplate>
	);
}
