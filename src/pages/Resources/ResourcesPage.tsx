import React from "react";
import ResourcesDataGrid from "../../components/DataGrid/ResourcesDataGrid";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import CommonPage from "../CommonPage";

const ResourcesPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isStatic:false}, false), "Risorse statiche");

	return (
		<CommonPage breadComponent={breadComponent}>
			<ResourcesDataGrid />
		</CommonPage>
	);
};

export default ResourcesPage;
