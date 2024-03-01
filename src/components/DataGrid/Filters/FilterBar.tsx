import React, { SetStateAction } from "react";
import { PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../../commons/constants";
import ROUTES from "../../../routes";
import checks from "../../../utils/checks";
import FilterTemplate from "./FilterTemplate";
import BpmnFilterComponent from "./BpmnFilterComponent";
import WRFilterComponent from "./WRFilterComponent";
import ResourcesFilterComponent from "./ResourcesFilterComponent";

type Props = {
	filterValues: any;
	setFilterValues: React.Dispatch<React.SetStateAction<any>>;
	setTableList: React.Dispatch<any>;
	getAllList: (filterValues?: any, pageIndex?: number) => void;
	newFilterValues: any;
	driver: string;
	loadingButton?: boolean;
	setLoadingButton: React.Dispatch<SetStateAction<boolean>>;
};

export default function FilterBar({ filterValues, setFilterValues, getAllList, newFilterValues, driver, loadingButton, setLoadingButton }: Props) {

	const { regexTestField } = checks();

	const filterBpmnWithoutStatus = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const withoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
		if (event.target.name === "status" && event.target.value === "" && !(withoutStatus.some((value => value[1] !== "")))) {
			getAllList(undefined, 0);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		const updatedFilterValues = { ...filterValues, [name]: value };
	
		switch (driver) {
		case PROCESS_RESOURCES:
			filterBpmnWithoutStatus(event);
			break;
		case RESOURCES:
			if (name === "noDeployableResourceType" && value === "") {
				const filterWithoutResourceType = Object.entries(filterValues).filter(el => el[0] !== "noDeployableResourceType");
				if (!(filterWithoutResourceType.some((value => value[1] !== "")))) {
					getAllList(undefined, 0);
				}
			}
			break;
		case WORKFLOW_RESOURCE:
			if ((name === "status" && value === "") || (name === "resourceType" && value === "")) {
				const filterWfResWithoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
				const filterWithoutWRResourceType = Object.entries(filterValues).filter(el => el[0] !== "resourceType");
		
				if ((name === "status" && value === "") && !(filterWfResWithoutStatus.some((value => value[1] !== "")))) {
					getAllList(undefined, 0);
				}
		
				if ((name === "resourceType" && value === "") && !(filterWithoutWRResourceType.some((value => value[1] !== "")))) {
					getAllList(undefined, 0);
				}
			}
			break;
		}
	
		setFilterValues(updatedFilterValues);
	};

	const handleChangeNumberOnly = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (e.target.value === "" || regexTestField(e.target.value, "int1toInfinity")) {
			setFilterValues({ ...filterValues, [e.target.name]: e.target.value });
		}
		filterBpmnWithoutStatus(e);
	};

	const handleSubmit = () => {
		setLoadingButton(true);
		if (Object.values(filterValues).some(value => value !== "")) {
			getAllList(filterValues, 0);
		}
	};

	const cleanFilter = () => {
		setFilterValues(newFilterValues);
		getAllList(undefined, 0);
	};

	const filterType = () => {
		switch (driver) {
		case PROCESS_RESOURCES:
			return <BpmnFilterComponent filterValues={filterValues} handleChange={handleChange} handleChangeNumberOnly={handleChangeNumberOnly} />;
		case RESOURCES:
			return <ResourcesFilterComponent filterValues={filterValues} handleChange={handleChange} />;
		case WORKFLOW_RESOURCE:
			return <WRFilterComponent filterValues={filterValues} handleChange={handleChange} />;
		default:
			return <></>;
		}
	};

	const filterRoutes = () => {
		switch (driver) {
		case PROCESS_RESOURCES:
			return ROUTES.CREATE_BPMN;
		case RESOURCES:
			return ROUTES.CREATE_RESOURCE;
		case WORKFLOW_RESOURCE:
			return ROUTES.CREATE_WR;
		default:
			return ROUTES.HOME;
		}
	};

	return (
		<FilterTemplate loadingButton={loadingButton} handleSubmit={handleSubmit} cleanFilter={cleanFilter} filterValues={filterValues} filterRoutes={filterRoutes()}>
			{filterType()}
		</FilterTemplate>
	);
}
