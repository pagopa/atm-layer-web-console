import { useState, useEffect } from "react";
import TableColumn from "../DataGrid/TableColumn";
import Modal from "../FormComponents/FormsBpmn/Modal";
import BpmnAssociatedDataGrid from "../DataGrid/BpmnAssociatedDataGrid";
import DetailPageTemplate from "../../pages/Layout/DetailPageTemplate";
import BpmnDetailButtons from "./BpmnDetailButtons";


type Props = {
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
    bpmnAssociateTable?: boolean;
};

const DetailBpmn = ({
	detailFields,
	detailTitle,
	breadComponent,
	bpmnAssociateTable,
}: Props) => {
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
		<DetailPageTemplate 
			detail={detail} 
			detailFields={detailFields} 
			detailTitle={detailTitle} 
			breadComponent={breadComponent} 
			openSnackBar={openSnackBar} 
			setOpenSnackBar={setOpenSnackBar} 
			type={type} 
			message={message} 
			severity={severity} 
			title={title}
		>
			<BpmnDetailButtons
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType}
				detail={detail}
			/>

			{bpmnAssociateTable &&
                    <BpmnAssociatedDataGrid
                    	buildColumnDefs={buildColumnDefs}
                    	visibleColumns={visibleColumns}
                    />
			}
			<Modal
				open={open}
				setOpen={setOpen}
				type={type}
				setOpenSnackBar={setOpenSnackBar}
				setSeverity={setSeverity}
				setMessage={setMessage}
				setTitle={setTitle}
			/>
		
		</DetailPageTemplate>
	);
};

export default DetailBpmn;