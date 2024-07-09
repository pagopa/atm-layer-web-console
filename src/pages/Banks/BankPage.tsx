import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import BreadCrumbMapper from "../../components/NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../../components/NavigationComponents/BreadcrumbComponent";
import BoxPageLayout from "../Layout/BoxPageLayout";
import { breadCrumbLinkComponent, commonBreadRoot } from "../../components/Commons/Commons";
import { Ctx } from "../../DataContext";
import { ActionAlert } from "../../components/Commons/ActionAlert";
import BankDataGrid from "../../components/DataGrid/BanksDataGrid";

const BankPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:false}, false), "Banche");
	const { clearStorage } = useContext(Ctx);

	const [type, setType] = useState("");
	const [open, setOpen] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");

	useEffect(() => {
		clearStorage();
	}, []);

	return (
		<React.Fragment>
			<Box mb={2} display={"flex"} justifyContent={"flex-start"} alignItems={"center"} mt={5} ml={5}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
			</Box>
			<BoxPageLayout shadow={true} px={0} mx={5}>
				<Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} width={"100%"}>
					<Box width={severity==="error"?"65%":"35%"} >
						<ActionAlert setOpenSnackBar={setOpenSnackBar} openSnackBar={openSnackBar} severity={severity} message={message} title={title} type={type} />
					</Box>
				</Box>
				<BankDataGrid 
					open={open}
					setType={setType}
					setOpen={setOpen}
					type={type}
					setOpenSnackBar={setOpenSnackBar}
					setSeverity={setSeverity}
					setMessage={setMessage}
					setTitle={setTitle}
				/>
			</BoxPageLayout>
		</React.Fragment>
	);
};

export default BankPage;