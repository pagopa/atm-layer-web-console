import React, { SetStateAction } from "react";
import { BPMN, RESOURCES, WORKFLOW_RESOURCE } from "../../../commons/constants";
import ROUTES from "../../../routes";
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
	loading?: boolean;
	setLoading: React.Dispatch<SetStateAction<boolean>>;
};

export default function FilterBar({ filterValues, setFilterValues, getAllList, newFilterValues, driver, loading, setLoading }: Props) {

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		switch (driver) {
		case BPMN:
			setFilterValues({ ...filterValues, [event.target.name]: event.target.value });
			const filterBpmnWithoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
			if ( event.target.name === "status" && event.target.value === "" && !(filterBpmnWithoutStatus.some((value => value[1] !== "")))	) {
				getAllList(undefined, 0);
			}
			break;
		case RESOURCES:
			setFilterValues({ ...filterValues, [event.target.name]: event.target.value });
			const filterWithoutResourceType = Object.entries(filterValues).filter(el => el[0] !== "noDeployableResourceType");
			if (event.target.name === "noDeployableResourceType" && event.target.value === "" && !(filterWithoutResourceType.some((value => value[1] !== "")))) {
				getAllList(undefined, 0);
			}
			break;
		case WORKFLOW_RESOURCE:
			setFilterValues({ ...filterValues, [event.target.name]: event.target.value });
			const filterWfResWithoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
			const filterWithoutWRResourceType = Object.entries(filterValues).filter(el => el[0] !== "resourceType");

			const statusCondition = (event.target.name === "status" && event.target.value === "" && !(filterWfResWithoutStatus.some((value => value[1] !== ""))));
			const wrResourceCondition = (event.target.name === "resourceType" && event.target.value === "" && !(filterWithoutWRResourceType.some((value => value[1] !== ""))));
			if (statusCondition || wrResourceCondition) {
				getAllList(undefined, 0);
			}
			break;
		}
	};

	const handleSubmit = () => {
		setLoading(true);
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
		case BPMN:
			return <BpmnFilterComponent filterValues={filterValues} handleChange={handleChange} />;
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
		case BPMN:
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
		<FilterTemplate loading={loading} handleSubmit={handleSubmit} cleanFilter={cleanFilter} filterValues={filterValues} filterRoutes={filterRoutes()}>
			{filterType()}
		</FilterTemplate>
	);
}
