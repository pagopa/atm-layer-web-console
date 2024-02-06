import { Box, Typography } from "@mui/material";
import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
import BreadCrumb from "../components/NavigationComponents/Breadcrumb";
import FormPageTemplate from "./Layout/FormPageTemplate";

const UpgradeBpmnPage = () => {
	const breadComponent = [
		<Typography key="1" color="text.primary">
			 Home
		</Typography>,
		<Typography key="2" color="text.primary">
			Risorse di processo
		</Typography>,
		<Typography key="3" color="text.primary">
            Dettaglio risorsa di processo
		</Typography>,
		<Typography key="4" color="primary">
                Aggiornamento processo
		</Typography>
	];

	return(
		<>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={10}>
				<BreadCrumb breadcrumb={breadComponent} mb={"4px"} />
			</Box>
			<FormPageTemplate>
				<UpgradeBpmn />
			</FormPageTemplate></>
	);
};

export default UpgradeBpmnPage;