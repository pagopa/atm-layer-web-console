import WorkflowResourceDataGrid from "../../components/DataGrid/WorkflowResourceDataGrid";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import CommonPage from "../CommonPage";

const WorkflowResourcePage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isWR:false}, false), "Risorse aggiuntive per processi");

	return (
		<CommonPage breadComponent={breadComponent}>
			<WorkflowResourceDataGrid />
		</CommonPage>
	);
};

export default WorkflowResourcePage;
