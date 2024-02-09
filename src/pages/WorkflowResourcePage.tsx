import WorkflowResourceDataGrid from "../components/DataGrid/WorkflowResourceDataGrid";
import BoxPageLayout from "./Layout/BoxPageLayout";

const WorkflowResourcePage = () => (
	<BoxPageLayout shadow={true} px={0} mx={5}>
		<WorkflowResourceDataGrid />
	</BoxPageLayout>
);

export default WorkflowResourcePage;