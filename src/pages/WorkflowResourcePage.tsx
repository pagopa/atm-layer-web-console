import CreateWR from "../components/FormComponents/FormsWorkflowResource/CreateWR";
import UpdateWR from "../components/FormComponents/FormsWorkflowResource/UpdateWR";
import DeployWR from "../components/FormComponents/FormsWorkflowResource/DeployWR";
import RollbackWR from "../components/FormComponents/FormsWorkflowResource/RollbackWR";
import FormPageTemplate from "./Layout/FormPageTemplate";


const WorkflowResourcePage = () => (
	<FormPageTemplate>

		<CreateWR />
		<UpdateWR />
		<DeployWR />
		<RollbackWR />
	</FormPageTemplate>

);


export default WorkflowResourcePage;