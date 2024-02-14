import { Box } from "@mui/system";
import { generatePath } from "react-router";
import Link from "@mui/material/Link";
import MinimalAssociateBpmn from "../components/FormComponents/FormsBpmn/MinimalAssociateBpmn";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import ROUTES from "../routes";
import { breadCrumbLinkComponent } from "../utils/Commons";
import FormPageTemplate from "./Layout/FormPageTemplate";

const AssociateBpmnPage = () => {
	const breadComponent = breadCrumbLinkComponent("Associazione risorsa di processo");

	return (
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<FormPageTemplate>
				<MinimalAssociateBpmn />
			</FormPageTemplate>
		</>);

};

export default AssociateBpmnPage;