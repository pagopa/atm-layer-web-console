import { Box } from "@mui/material";
import CreateBpmn from "../../components/FormComponents/FormsBpmn/CreateBpmn";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import FormPageTemplate from "../Layout/FormPageTemplate";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";


const CreateBpmnPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:true}, false), "Creazione risorsa di processo");

	return(
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<FormPageTemplate>
				<CreateBpmn />
			</FormPageTemplate>
		</>
	);
};

export default CreateBpmnPage;