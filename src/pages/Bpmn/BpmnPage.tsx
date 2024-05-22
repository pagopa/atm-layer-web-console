import React from "react";
import BpmnDataGrid from "../../components/DataGrid/BpmnDataGrid";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import CommonPage from "../CommonPage";

const BpmnPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:false}, false), "Risorse di processo");

	return (
		<CommonPage breadComponent={breadComponent}>
			<BpmnDataGrid />
		</CommonPage>
	);
};

export default BpmnPage;
