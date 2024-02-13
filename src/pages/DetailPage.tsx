import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BpmnAssociatedDataGrid from "../components/DataGrid/BpmnAssociatedDataGrid";
import DetailBox from "../components/Commons/DetailBox";
import { ActionAlert } from "../components/Commons/ActionAlert";
import Modal from "../components/FormComponents/FormsBpmn/Modal";
import TableColumn from "../components/DataGrid/TableColumn";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import BoxPageLayout from "./Layout/BoxPageLayout";
import BpmnDetailButtons from "./../components/Commons/BpmnDetailButtons";

const DetailPage = () => {

	const [detail, setDetail] = useState({});
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("");
	const { buildColumnDefs, visibleColumns } = TableColumn(setOpen, setType);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	const breadComponent = [ "Home", "Risorse di processo", "Dettaglio risorsa di processo"];

	useEffect(() => {
		const storedRecordParams = localStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);


	return (
		<BoxPageLayout px={10}>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"}/>
				<Box width={"25%"}>
					<ActionAlert openSnackBar={openSnackBar} severity={severity} message={message} title={title} />
				</Box>
			</Box>
			<DetailBox detail={detail} />
			<BpmnAssociatedDataGrid 
				buildColumnDefs={buildColumnDefs}
				visibleColumns={visibleColumns}
			/>
			<BpmnDetailButtons
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType} 
				detail={detail}
			/>
			<Modal
				open={open}
				setOpen={setOpen}
				type={type}
				openSnackBar={openSnackBar}
				setOpenSnackBar={setOpenSnackBar}
				severity={severity}
				setSeverity={setSeverity}
				message={message}
				setMessage={setMessage}
				title={title}
				setTitle={setTitle}
			/>
		</BoxPageLayout>
	);
};


export default DetailPage;
