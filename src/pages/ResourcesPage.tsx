import { Box } from "@mui/material";
import React from "react";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import ResourcesDataGrid from "../components/DataGrid/ResourcesDataGrid";
import BoxPageLayout from "./Layout/BoxPageLayout";

const ResourcesPage = () => {
	const breadComponent = ["Home", "Risorse statiche"];
	return (
		<React.Fragment>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={5}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<BoxPageLayout shadow={true} px={0} mx={5}>
				<ResourcesDataGrid />
			</BoxPageLayout>
		</React.Fragment>
	);
};

export default ResourcesPage;