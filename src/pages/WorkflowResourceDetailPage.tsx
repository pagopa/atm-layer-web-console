import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DetailBox from "../components/Commons/DetailBox";
import { ActionAlert } from "../components/Commons/ActionAlert";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import formatValues from "../utils/formatValues";
import WorkflowResourcesDetailButtons from "../components/Commons/WorkflowResourcesDetailButtons";
import ModalWR from "../components/FormComponents/FormsBpmn/ModalWR";
import BoxPageLayout from "./Layout/BoxPageLayout";

const WorkflowResourceDetailPage = () => {

	const [detail, setDetail] = useState({});
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("");
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");
	const breadComponent = [ "Home", "Risorse aggiuntive per processi", "Dettaglio risorsa aggiuntiva per processo"];
	const { formatDateToString } = formatValues();
	const fields = [
		{ label: "Tipo risorsa", value: "resourceS3Type" },
		{ label: "Nome file", value: "fileName" },
		{ label: "Stato", value: "status" },
		{ label: "Data creazione", value: "createdAt", format: formatDateToString},
		{ label: "Data ultima modifica", value: "lastUpdatedAt", format: formatDateToString},
	];
	const detailTitle = "Dettaglio risorsa aggiuntiva per processo";
	

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
					<ActionAlert setOpenSnackBar={setOpenSnackBar} openSnackBar={openSnackBar} severity={severity} message={message} title={title} type={type} />
				</Box>
			</Box>
			<DetailBox detail={detail} fields={fields} detailTitle={detailTitle}/>
			<WorkflowResourcesDetailButtons
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType} 
				detail={detail}
			/>
			<ModalWR
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


export default WorkflowResourceDetailPage;