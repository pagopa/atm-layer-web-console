import React, { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import WorkflowResourceDataGrid from "../../components/DataGrid/WorkflowResourceDataGrid";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BoxPageLayout from "../Layout/BoxPageLayout";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../utils/Commons";
import { Ctx } from "../../DataContext";

const WorkflowResourcePage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isWR:false}, false), "Risorse aggiuntive per processi");
	const { clearStorage } = useContext(Ctx);

	useEffect(() => {
		clearStorage();
	}, []);
	
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