import React, { useState } from "react";
import { BPMN, WORKFLOW_RESOURCE } from "../../commons/constants";
import ROUTES from "../../routes";
import FilterTemplate from "./FilterTemplate";
import BpmnFilterComponent from "./Filters/BpmnFilterComponent";
import WorkflowResourcesFilterComponent from "./Filters/WorkflowResourcesFilterComponent";

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
		setFilterValues({ ...filterValues, [fieldName]: event.target.value });
		const filterWithoutStatus = Object.entries(	filterValues).filter(el=>el[0]!=="status");
		if (
			event.target.name === "status" &&
			event.target.value === "" &&
			!(filterWithoutStatus.some((value => value[1] !== "")))
		) {
			getAllList();
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
			return <WorkflowResourcesFilterComponent filterValues={filterValues} handleChange={handleChange} menuItems={menuItems} />;
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
