import BpmnDataGrid from "../components/DataGrid/BpmnDataGrid";
import BoxPageLayout from "./Layout/BoxPageLayout";

const BpmnPage = () => (
	<BoxPageLayout shadow={true} px={0} mx={5}>
		<BpmnDataGrid />
	</BoxPageLayout>
);

export default BpmnPage;