import { Box } from "@mui/material";
import UpgradeBpmn from "../../components/FormComponents/FormsBpmn/UpgradeBpmn";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import FormPageTemplate from "../Layout/FormPageTemplate";

const UpgradeBpmnPage = () => {
	
	const recordParamsString = sessionStorage.getItem("recordParams");
	const recordParams = recordParamsString ? JSON.parse(recordParamsString) : "";
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:true}, true, recordParams), "Aggiornamento risorsa di processo");

	return(
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"}/>
			</Box>
			<FormPageTemplate>
				<UpgradeBpmn />
			</FormPageTemplate>
		</>
	);
};

export default UpgradeBpmnPage;