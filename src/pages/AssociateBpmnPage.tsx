import { Box } from "@mui/system";
import MinimalAssociateBpmn from "../components/FormComponents/FormsBpmn/MinimalAssociateBpmn";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import FormPageTemplate from "./Layout/FormPageTemplate";

const AssociateBpmnPage = () => {
	const breadComponent = ["Home", "Risorse di processo", "Dettaglio risorsa di processo",  "Associazione risorsa di processo"];

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