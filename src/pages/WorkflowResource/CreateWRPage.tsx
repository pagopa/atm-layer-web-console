import { Box } from "@mui/material";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import CreateWR from "../../components/FormComponents/FormsWorkflowResource/CreateWR";
import FormPageTemplate from "../Layout/FormPageTemplate";


const CreateWRPage = () => {
	const breadComponent = ["Home", "Risorse aggiuntive per processi", "Creazione risorsa aggiuntiva"];

	return(
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<FormPageTemplate>
				<CreateWR />
			</FormPageTemplate>
		</>
	);
};

export default CreateWRPage;