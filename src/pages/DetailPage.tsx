import { useEffect, useState } from "react";
import BpmnAssociatedDataGrid from "../components/DataGrid/BpmnAssociatedDataGrid";
import DetailBox from "../components/Commons/DetailBox";
import { ActionAlert } from "../components/Commons/ActionAlert";
import ModalBpmn from "../components/FormComponents/FormsBpmn/Modal";
import TableColumn from "../components/DataGrid/TableColumn";
import { BPMN_ASSOCIATED } from "../commons/constants";
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

	useEffect(() => {
		const storedRecordParams = localStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);

	return (
		<BoxPageLayout px={10}>
			<ActionAlert
				openSnackBar={openSnackBar}
				severity={severity}
				message={message}
				title={title}
			/>
			<DetailBox detail={detail} />
			<BpmnAssociatedDataGrid 
				buildColumnDefs={buildColumnDefs}
				visibleColumns={visibleColumns}
			/>
			<BpmnDetailButtons
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType}
			/>
			<ModalBpmn
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
