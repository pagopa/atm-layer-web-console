import { Box, Typography } from "@mui/material";
import CreateBpmn from "../components/FormComponents/FormsBpmn/CreateBpmn";
import BreadCrumb from "../components/NavigationComponents/Breadcrumb";
import FormPageTemplate from "./Layout/FormPageTemplate";


const CreateBpmnPage = () => {
	const breadComponent = [
		<Typography key="1" color="text.primary">
			 Home
		</Typography>,
		<Typography key="2" color="text.primary">
			Risorse di processo
		</Typography>,
		<Typography key="3" color="primary">
            Creazione risorsa di processo
		</Typography>
	];

	return(
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={breadComponent} mb={"4px"} />
			</Box><FormPageTemplate>
				<CreateBpmn />
			</FormPageTemplate>
		</>
	);
};

export default CreateBpmnPage;