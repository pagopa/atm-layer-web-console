import { Box, Typography } from "@mui/material";
import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import FormPageTemplate from "./Layout/FormPageTemplate";

const UpgradeBpmnPage = () => {
	const breadComponent = ["Home", "Risorse di processo", "Aggiornamento risorsa di processo"];

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