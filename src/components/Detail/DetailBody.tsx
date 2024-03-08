import { useState } from "react";
import { PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../commons/constants";
import DetailPageTemplate from "../../pages/Layout/DetailPageTemplate";
import ModalResources from "../FormComponents/FormsResources/ModalResources";
import ModalWR from "../FormComponents/FormsWorkflowResource/ModalWR";
import BpmnAssociatedDataGrid from "../DataGrid/BpmnAssociatedDataGrid";
import ModalBpmn from "../FormComponents/FormsBpmn/ModalBpmn";
import TableColumn from "../DataGrid/TableColumn";
import ResourcesDetailButtons from "./ResourcesDetailButtons";
import WorkflowResourcesDetailButtons from "./WorkflowResourcesDetailButtons";
import BpmnDetailButtons from "./BpmnDetailButtons";

type Props = {
    detail: any;
    driver: string;
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
    bpmnAssociateTable?: boolean;
};

const DetailBody = ({
	detail,
	driver,
	detailFields,
	detailTitle,
	breadComponent,
	bpmnAssociateTable,
}: Props) => {

	const [open, setOpen] = useState(false);
	const [type, setType] = useState("");
	const { buildColumnDefs, visibleColumns } = TableColumn(setOpen, setType);
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");

	const detailBodyType = (driver: string) => {
		switch (driver) {
		case PROCESS_RESOURCES:
			return (
				<>
					<BpmnDetailButtons
						openDialog={() => setOpen(true)}
						type={type}
						setType={setType}
						detail={detail}
					/>

					{
						bpmnAssociateTable && buildColumnDefs && visibleColumns && (
							<BpmnAssociatedDataGrid
								buildColumnDefs={buildColumnDefs}
								visibleColumns={visibleColumns}
							/>
						)
					}
					<ModalBpmn
						open={open}
						setOpen={setOpen}
						type={type}
						setOpenSnackBar={setOpenSnackBar}
						setSeverity={setSeverity}
						setMessage={setMessage}
						setTitle={setTitle}
					/>
				</>
			);
		case RESOURCES:
			return (
				<>
					<ResourcesDetailButtons
						openDialog={() => setOpen(true)}
						type={type}
						setType={setType}
						detail={detail}
					/>
					<ModalResources
						open={open}
						setOpen={setOpen}
						type={type}
						setOpenSnackBar={setOpenSnackBar}
						setSeverity={setSeverity}
						setMessage={setMessage}
						setTitle={setTitle}
						detail={detail}
					/>
				</>
			);
		case WORKFLOW_RESOURCE:
			return (
				<>
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
						setOpenSnackBar={setOpenSnackBar}
						setSeverity={setSeverity}
						setMessage={setMessage}
						setTitle={setTitle}
					/>
				</>
			);
		}
	};

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
			{detailBodyType(driver)}
		</DetailPageTemplate>
	);
};

export default DetailBody;
