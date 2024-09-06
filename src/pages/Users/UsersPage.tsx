import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { breadCrumbLinkComponent, commonBreadRoot, getProfilesIds } from "../../components/Commons/Commons";
import CommonPage from "../CommonPage";
import UsersDataGrid from "../../components/DataGrid/UsersDataGrid";
import { ActionAlert } from "../../components/Commons/ActionAlert";
import { Ctx } from "../../DataContext";

const UsersPage = () => {
	const breadComponent = breadCrumbLinkComponent(commonBreadRoot({isBpmn:false}, false), "Utenti e autorizzazioni");

	const [type, setType] = useState("");
	const [open, setOpen] = useState(false);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");

	const { loggedUserInfo } = useContext(Ctx);

	// useEffect(() => {
	// 	if (!loggedUserInfo.name && !loggedUserInfo.surname && getProfilesIds(loggedUserInfo).includes(5)){
	// 		sessionStorage.setItem("recordParamsUser", JSON.stringify(loggedUserInfo));
	// 		setOpen(true);
	// 		setType(UPDATE_FIRST_USER);
	// 	}
	// }, [loggedUserInfo]);

	return (
		<CommonPage breadComponent={breadComponent}>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} width={"100%"}>
				<Box width={severity==="error"?"65%":"35%"} >
					<ActionAlert setOpenSnackBar={setOpenSnackBar} openSnackBar={openSnackBar} severity={severity} message={message} title={title} type={type} />
				</Box>
			</Box>
			<UsersDataGrid 
				open={open}
				setType={setType}
				setOpen={setOpen}
				type={type}
				setOpenSnackBar={setOpenSnackBar}
				setSeverity={setSeverity}
				setMessage={setMessage}
				setTitle={setTitle}
			/>
		</CommonPage>
	);
};

export default UsersPage;
