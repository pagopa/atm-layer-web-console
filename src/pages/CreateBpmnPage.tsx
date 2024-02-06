import { Box } from "@mui/material";
import CreateBpmn from "../components/FormComponents/FormsBpmn/CreateBpmn";
import ROUTES from "../routes";
import GoBackButton from "../components/Commons/GoBackButton";
import FormPageTemplate from "./Layout/FormPageTemplate";

const CreateBpmnPage = () => (
	<>
		<Box marginLeft={4}>
			<GoBackButton route={ROUTES.BPMN} />
		</Box>
		<FormPageTemplate>
			<CreateBpmn />
		</FormPageTemplate>
	</>

);

export default CreateBpmnPage;