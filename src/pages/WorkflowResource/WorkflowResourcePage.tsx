import React from "react";
import { Box } from "@mui/material";
import WorkflowResourceDataGrid from "../../components/DataGrid/WorkflowResourceDataGrid";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BoxPageLayout from "../Layout/BoxPageLayout";

const WorkflowResourcePage = () => {
	const breadComponent = ["Home", "Risorse aggiuntive per processi"];

	return(
		<React.Fragment>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={5}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<BoxPageLayout shadow={true} px={0} mx={5}>
				<WorkflowResourceDataGrid />
			</BoxPageLayout>
		</React.Fragment>
	);
};

export default WorkflowResourcePage;