import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import BpmnDataGrid from "../../components/DataGrid/BpmnDataGrid";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BoxPageLayout from "../Layout/BoxPageLayout";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import { Ctx } from "../../DataContext";

const BpmnPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:false}, false), "Risorse di processo");
	const { clearStorage } = useContext(Ctx);

	useEffect(() => {
		clearStorage();
	}, []);

	return (
		<React.Fragment>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={5}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<BoxPageLayout shadow={true} px={0} mx={5}>
				<BpmnDataGrid />
			</BoxPageLayout>
		</React.Fragment>
	);
};

export default BpmnPage;