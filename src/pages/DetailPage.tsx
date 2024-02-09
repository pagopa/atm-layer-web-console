import { useContext, useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { Ctx } from "../DataContext";
import fetchGetAllAssociatedBpmn from "../hook/fetch/Bpmn/fetchGetAllAssociatedBpmn";
import BpmnAssociatedDataGrid from "../components/DataGrid/BpmnAssociatedDataGrid";
import TableColumn from "../components/DataGrid/TableColumn";
import { BPMN_ASSOCIATED } from "../commons/constants";
import DetailBox from "../components/Commons/DetailBox";
import { GET_ALL_BPMN_ASSOCIATED } from "../commons/endpoints";
import { ActionAlert } from "../components/Commons/ActionAlert";
import ModalBpmn from "../components/FormComponents/FormsBpmn/Modal";
import BreadCrumb from "../components/NavigationComponents/BreadcrumbComponent";
import BreadCrumbMapper from "../components/NavigationComponents/BreadCrumbMapper";
import BoxPageLayout from "./Layout/BoxPageLayout";
import BpmnDetailButtons from "./../components/Commons/BpmnDetailButtons";

const DetailPage = () => {

	const { abortController, recordParams} = useContext(Ctx);
	const [detail, setDetail] = useState({});
	const { bpmnId, modelVersion } = useParams();
	const [tableListBpmnAssociated, setTableListBpmnAssociated] = useState<any>([]);
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("");
	const { buildColumnDefs, visibleColumns } = TableColumn(setOpen, setType);
	const columns: Array<GridColDef> = buildColumnDefs(BPMN_ASSOCIATED);
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 5,
	});
	const [totalAssociationsFound, setTotalAssociationsFound] = useState(0);
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

	const getAllAssociatedBpmn = async (pageIndex?: number) => {
		const baseUrl = generatePath(GET_ALL_BPMN_ASSOCIATED, { bpmnId: bpmnId ?? "", modelVersion: modelVersion ?? "" });
		const paginatedUrl = `${baseUrl}?pageIndex=${pageIndex ?? paginationModel.page}&pageSize=${paginationModel.pageSize}`;
		try {
			const response = await fetchGetAllAssociatedBpmn({
				abortController, url: paginatedUrl
			})();
			console.log("response", response);
			if (response?.success) {
				const { page, limit, results, itemsFound } = response.valuesObj;
				setTableListBpmnAssociated(results);
				setPaginationModel({ page, pageSize: limit });
				setTotalAssociationsFound(itemsFound);
			} else {
				setTableListBpmnAssociated([]);
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

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
				tableList={tableListBpmnAssociated}
				columns={columns}
				columnVisibilityModel={visibleColumns(BPMN_ASSOCIATED)}
				getAllList={getAllAssociatedBpmn}
				setPaginationModel={setPaginationModel}
				paginationModel={paginationModel}
				totalAssociationsFound={totalAssociationsFound}
			/>
			<BpmnDetailButtons openDialog={() => setOpen(true)} type={type} setType={setType}  />
			<ModalBpmn open={open} setOpen={setOpen} type={type} openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} severity={severity} setSeverity={setSeverity} message={message} setMessage={setMessage} title={title} setTitle={setTitle} />
		</BoxPageLayout>
	);
};


export default DetailPage;
