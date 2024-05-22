import React, { useContext, useEffect, ReactNode } from "react";
import { Box } from "@mui/material";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import { Ctx } from "../DataContext";
import BoxPageLayout from "./Layout/BoxPageLayout";

interface CommonPageProps {
    breadComponent: any;
    children: ReactNode;
}

const CommonPage: React.FC<CommonPageProps> = ({ breadComponent, children }) => {
	const { clearStorage } = useContext(Ctx);

	useEffect(() => {
		clearStorage();
	}, [clearStorage]);

	return (
		<React.Fragment>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={5}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<BoxPageLayout shadow={true} px={0} mx={5}>
				{children}
			</BoxPageLayout>
		</React.Fragment>
	);
};

export default CommonPage;