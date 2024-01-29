// import UpgradeBpmn from "../components/FormComponents/FormsBpmn/UpgradeBpmn";
// import AssociateBpmn from "../components/FormComponents/FormsBpmn/AssociateBpmn";
// import DeleteBpmn from "../components/FormComponents/FormsBpmn/DeleteBpmn";
// import DeployBpmn from "../components/FormComponents/FormsBpmn/DeployBpmn";
// import CreateBpmn from "../components/FormComponents/FormsBpmn/CreateBpmn";
import AllFileTableList from "../components/DataGrid/AllFileTableList";
import BoxPageLayout from "./Layout/BoxPageLayout";
// import FormPageTemplate from "./Layout/FormPageTemplate";

const BpmnPage = () => (

	<BoxPageLayout shadow={false} px={0} mx={5}>
		<AllFileTableList />
		{/* <FormPageTemplate>
			
			<CreateBpmn />
			<DeployBpmn />
			<UpgradeBpmn />
			<AssociateBpmn />
			 <DeleteBpmn /> 
			
		</FormPageTemplate>
*/}
	</BoxPageLayout>
);

export default BpmnPage;