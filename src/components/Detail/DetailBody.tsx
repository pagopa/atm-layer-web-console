import { useState } from "react";
import React from "react";
import { BANKS, PROCESS_RESOURCES, RESOURCES, WORKFLOW_RESOURCE } from "../../commons/constants";
import DetailPageTemplate from "../../pages/Layout/DetailPageTemplate";
import ModalResources from "../FormComponents/FormsResources/ModalResources";
import ModalWR from "../FormComponents/FormsWorkflowResource/ModalWR";
import BpmnAssociatedDataGrid from "../DataGrid/BpmnAssociatedDataGrid";
import ModalBpmn from "../FormComponents/FormsBpmn/ModalBpmn";
import TableColumn from "../DataGrid/TableColumn";
import ModalBank from "../FormComponents/FormsBank/ModalBank";
import ResourcesDetailButtons from "./ResourcesDetailButtons";
import WorkflowResourcesDetailButtons from "./WorkflowResourcesDetailButtons";
import BpmnDetailButtons from "./BpmnDetailButtons";
import BankDetailButtons from "./BankDetailButtons";

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
				<React.Fragment>
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
				</React.Fragment>
			);
		case RESOURCES:
			return (
				<React.Fragment>
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
				</React.Fragment>
			);
		case WORKFLOW_RESOURCE:
			return (
				<React.Fragment>
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
				</React.Fragment>
			);
		case BANKS:
			return (
				<>
					<BankDetailButtons
						openDialog={() => setOpen(true)}
						type={type}
						setType={setType}
						detail={detail}
					/>
					<ModalBank
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
