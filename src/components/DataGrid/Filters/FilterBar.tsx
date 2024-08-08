/* eslint-disable functional/immutable-data */
/* eslint-disable prefer-const */
/* eslint-disable functional/no-let */
import React, { SetStateAction, useState } from "react";
import { BANKS, PROCESS_RESOURCES, RESOURCES, TRANSACTIONS, USERS, WORKFLOW_RESOURCE } from "../../../commons/constants";
import ROUTES from "../../../routes";
import checks from "../../../utils/checks";
import FilterTemplate from "./FilterTemplate";
import BpmnFilterComponent from "./BpmnFilterComponent";
import WRFilterComponent from "./WRFilterComponent";
import ResourcesFilterComponent from "./ResourcesFilterComponent";
import TransactionsFilterComponent from "./TransactionsFilterComponent";
import BanksFilterComponent from "./BanksFilterComponent";
import UsersFilterComponent from "./UsersFilterComponent";

type Props = {
	filterValues: any;
	setFilterValues: React.Dispatch<React.SetStateAction<any>>;
	setTableList: React.Dispatch<any>;
	getAllList: (filterValues?: any, pageIndex?: number) => void;
	newFilterValues: any;
	driver: string;
	loadingButton?: boolean;
	setLoadingButton: React.Dispatch<SetStateAction<boolean>>;
	createIcon?: boolean;
	handleClick?: any;
};

export default function FilterBar({ filterValues, setFilterValues, getAllList, newFilterValues, driver, loadingButton, setLoadingButton, createIcon, handleClick }: Props) {
	const [errors, setErrors] = useState<any>({});
	const [submitted, setSubmitted] = useState(false);
	const { regexTestField } = checks();

	const showCreateButton :boolean = driver !== TRANSACTIONS;

	const filterBpmnWithoutStatus = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const withoutStatus = Object.entries(filterValues).filter(el => el[0] !== "status");
		if (event.target.name === "status" && event.target.value === "" && !(withoutStatus.some((value => value[1] !== "")))) {
			getAllList(undefined, 0);
		}
	};

	const handleDriverSpecificLogic = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, updatedFilterValues: any) => {
		const { name, value } = event.target;

		switch (driver) {
		case PROCESS_RESOURCES:
			filterBpmnWithoutStatus(event);
			break;
		case RESOURCES:
			if (name === "noDeployableResourceType" && value === "") {
				const filterWithoutResourceType = Object.entries(updatedFilterValues).filter(el => el[0] !== "noDeployableResourceType");
				if (!(filterWithoutResourceType.some((value => value[1] !== "")))) {
					getAllList(undefined, 0);
				}
			}
			break;
		case WORKFLOW_RESOURCE:
			if ((name === "status" && value === "") || (name === "resourceType" && value === "")) {
				const filterWfResWithoutStatus = Object.entries(updatedFilterValues).filter(el => el[0] !== "status");
				const filterWithoutWRResourceType = Object.entries(updatedFilterValues).filter(el => el[0] !== "resourceType");

				if ((name === "status" && value === "") && !(filterWfResWithoutStatus.some((value => value[1] !== "")))) {
					getAllList(undefined, 0);
				}

				if ((name === "resourceType" && value === "") && !(filterWithoutWRResourceType.some((value => value[1] !== "")))) {
					getAllList(undefined, 0);
				}
			}
			break;
		default:
			break;
		}
	};

	const clearErrorsIfCorrected = (name: string, value: string, updatedFilterValues: any) => {
		let newErrors = { ...errors };
		if (name === "rateMin" || name === "rateMax") {
			if (!updatedFilterValues.rateMin || !updatedFilterValues.rateMax || parseInt(updatedFilterValues.rateMax, 10) >= parseInt(updatedFilterValues.rateMin, 10)) {
				delete newErrors.rateMin;
				delete newErrors.rateMax;
			}
		}
		return newErrors;
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		const updatedFilterValues = { ...filterValues, [name]: value };

		handleDriverSpecificLogic(event, updatedFilterValues);

		setFilterValues(updatedFilterValues);

		if (submitted) {
			const newErrors = clearErrorsIfCorrected(name, value, updatedFilterValues);
			setErrors(newErrors);
		}
	};

	const handleChangeNumberOnly = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (e.target.value === "" || regexTestField(e.target.value, "int1toInfinity")) {
			setFilterValues({ ...filterValues, [e.target.name]: e.target.value });
		}
		filterBpmnWithoutStatus(e);
	};

	const handleTimeStampChange = (e:Date, key: string) => {
		const timeStampValue = new Date(e.getTime() - (e.getTimezoneOffset() * 60000)).toISOString().substr(0, 19).replace("T", " ");
		const timeStampQuery = `{"Timestamp":"${timeStampValue}"}`;
		console.log("setting timeStampValue: "+timeStampQuery);
		const updatedFilterValues = { ...filterValues, [key]: timeStampValue};

		setFilterValues(updatedFilterValues);

		if (submitted) {
			const newErrors = clearErrorsIfCorrected(key, timeStampValue, updatedFilterValues);
			setErrors(newErrors);
		}
	};

	const handleSubmit = () => {
		setSubmitted(true);
		let newErrors = { ...errors };

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			setLoadingButton(true);
			if (Object.values(filterValues).some(value => value !== "")) {
				getAllList(filterValues, 0);
			}
		}
	};

	const cleanFilter = () => {
		setFilterValues(newFilterValues);
		getAllList(undefined, 0);
		setErrors({});
		setSubmitted(false);
	};

	const filterType = () => {
		switch (driver) {
		case PROCESS_RESOURCES:
			return <BpmnFilterComponent filterValues={filterValues} handleChange={handleChange} handleChangeNumberOnly={handleChangeNumberOnly} />;
		case RESOURCES:
			return <ResourcesFilterComponent filterValues={filterValues} handleChange={handleChange} />;
		case WORKFLOW_RESOURCE:
			return <WRFilterComponent filterValues={filterValues} handleChange={handleChange} />;
		case TRANSACTIONS:
			return <TransactionsFilterComponent filterValues={filterValues} handleChange={handleChange} handleTimeStampChange={handleTimeStampChange}/>;
		case BANKS:
			return <BanksFilterComponent filterValues={filterValues} handleChange={handleChange} errors={errors} showErrors={submitted} />;
		case USERS:
			return <UsersFilterComponent filterValues={filterValues} handleChange={handleChange} />;
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
		<FilterTemplate loadingButton={loadingButton} handleSubmit={handleSubmit} cleanFilter={cleanFilter} filterValues={filterValues} filterRoutes={filterRoutes()} createIcon={createIcon} handleClick={handleClick}>
			{filterType()}
		</FilterTemplate>
	);
}
