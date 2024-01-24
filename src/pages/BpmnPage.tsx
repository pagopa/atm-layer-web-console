import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
import AssociateBpmn from "../components/FormComponents/FormsBpmn/AssociateBpmn";
import DeleteBpmn from "../components/FormComponents/FormsBpmn/DeleteBpmn";
import DeployBpmn from "../components/FormComponents/FormsBpmn/DeployBpmn";
import CreateBpmn from "../components/FormComponents/FormsBpmn/CreateBpmn";
import TableBpmn from "../components/FormComponents/FormsBpmn/TableBpmn";
import FormPageTemplate from "./Layout/FormPageTemplate";

const BpmnPage = () => (
	<FormPageTemplate>
		<TableBpmn />
		<CreateBpmn />
		<DeployBpmn />
		<UpgradeBpmn />
		<AssociateBpmn />
		<DeleteBpmn />
	</FormPageTemplate>

);

export default BpmnPage;