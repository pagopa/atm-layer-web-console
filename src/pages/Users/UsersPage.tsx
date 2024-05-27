import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import CommonPage from "../CommonPage";
import UsersDataGrid from "../../components/DataGrid/UsersDataGrid";

const UsersPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:false}, false), "Risorse di processo");

	return (
		<CommonPage breadComponent={breadComponent}>
			<UsersDataGrid />
		</CommonPage>
	);
};

export default UsersPage;
