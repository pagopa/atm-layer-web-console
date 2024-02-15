import { Box } from "@mui/material";
import CreateBpmn from "../../components/FormComponents/FormsBpmn/CreateBpmn";
import ROUTES from "../../routes";
import GoBackButton from "../../components/Commons/GoBackButton";
import CreateWR from "../../components/FormComponents/FormsWorkflowResource/CreateWR";
import FormPageTemplate from "../Layout/FormPageTemplate";

const CreateWorkflowResourcePage = () => (
	<>
		<Box marginLeft={4}>
			<GoBackButton route={ROUTES.WORKFLOW_RESOURCES} />
		</Box>
		<FormPageTemplate>
			<CreateWR />
		</FormPageTemplate>
	</>
);