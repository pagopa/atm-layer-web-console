import { Box } from "@mui/material";
import CreateResources from "../../components/FormComponents/FormsResources/CreateResources";
import FormPageTemplate from "../Layout/FormPageTemplate";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";


const CreateResourcesPage = () => {
	const breadComponent = ["Home", "Risorse statiche", "Creazione risorsa statica"];

	return (
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<FormPageTemplate>
				<CreateResources />
			</FormPageTemplate>
		</>
	);
};

export default CreateResourcesPage;