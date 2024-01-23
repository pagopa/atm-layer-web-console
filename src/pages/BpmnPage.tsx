import NewBpmn from "../components/FormComponents/FormsBpmn/NewBpmn";
import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
import AssociateBpmn from "../components/FormComponents/FormsBpmn/AssociateBpmn";
import DeleteBpmn from "../components/FormComponents/FormsBpmn/DeleteBpmn";
import DeployBpmn from "../components/FormComponents/FormsBpmn/DeployBpmn";
import FormPageTemplate from "./Layout/FormPageTemplate";

const BpmnPage = () => (
	<FormPageTemplate>
		<NewBpmn />
		<DeployBpmn />
		<UpgradeBpmn />
		<AssociateBpmn />
		<DeleteBpmn />

	</FormPageTemplate>

);

export default BpmnPage;