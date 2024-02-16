import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import BoxPageLayout from "../../pages/Layout/BoxPageLayout";
import TableColumn from "../DataGrid/TableColumn";
import BreadCrumbMapper from "../NavigationComponents/BreadCrumbMapper";
import BreadCrumb from "../NavigationComponents/BreadcrumbComponent";
import Modal from "../FormComponents/FormsBpmn/Modal";
import BpmnAssociatedDataGrid from "../DataGrid/BpmnAssociatedDataGrid";
import { BPMN, RESOURCES, WORKFLOW_RESOURCE } from "../../commons/constants";
import ModalWR from "../FormComponents/FormsWorkflowResource/ModalWR";
import { ActionAlert } from "./ActionAlert";
import DetailBox from "./DetailBox";
import WorkflowResourcesDetailButtons from "./WorkflowResourcesDetailButtons";
import BpmnDetailButtons from "./BpmnDetailButtons";
import ResourcesDetailButtons from "./ResourcesDetailButtons";

type Props = {
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
    detailButtonsComponentType: string;
    bpmnAssociateTable?: boolean;
};

const DetailPage = ({
	detailFields,
	detailTitle,
	breadComponent,
	detailButtonsComponentType,
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

	const DetailButtons = () => {
		switch (detailButtonsComponentType) {
		case BPMN:
			return <BpmnDetailButtons
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType}
				detail={detail}
			/>;
		case RESOURCES:
			return <ResourcesDetailButtons 
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType}
				detail={detail}
			/>;
		case WORKFLOW_RESOURCE: 
			return <WorkflowResourcesDetailButtons
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType}
				detail={detail}
			/>;
		default:
			return null;
		};
	};

	return (
		<BoxPageLayout px={10}>
			<Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
				<BreadCrumb breadcrumb={BreadCrumbMapper(breadComponent)} mb={"4px"} />
				<Box width={"25%"}>
					<ActionAlert setOpenSnackBar={setOpenSnackBar} openSnackBar={openSnackBar} severity={severity} message={message} title={title} type={type} />
				</Box>
			</Box>
			<DetailBox detail={detail} fields={detailFields} detailTitle={detailTitle} />
			{DetailButtons()}

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
				openSnackBar={openSnackBar}
				setOpenSnackBar={setOpenSnackBar}
				severity={severity}
				setSeverity={setSeverity}
				message={message}
				setMessage={setMessage}
				title={title}
				setTitle={setTitle}
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

export default DetailPage;