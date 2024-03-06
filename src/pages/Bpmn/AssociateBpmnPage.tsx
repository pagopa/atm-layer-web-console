import { Box } from "@mui/system";
import AssociateBpmn from "../../components/FormComponents/FormsBpmn/AssociateBpmn";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import FormPageTemplate from "../Layout/FormPageTemplate";

const AssociateBpmnPage = () => {
	const recordParams = JSON.parse(sessionStorage.getItem("recordParams") ?? "");
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:true}, true, recordParams), "Associazione risorsa di processo");

	return (
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<FormPageTemplate>
				<AssociateBpmn />
			</FormPageTemplate>
		</>);

};

export default AssociateBpmnPage;