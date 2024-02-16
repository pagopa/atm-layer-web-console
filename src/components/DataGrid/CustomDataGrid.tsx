import { alpha, styled } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)({
	border: "none !important",
	// boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.2)",
	"& .MuiDataGrid-main": {
		// padding: "0 24px 24px 24px",
	},
	"&.MuiDataGrid-root .MuiDataGrid-columnHeaders": {
		backgroundColor: "#00A1B0"
	},
	"&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
		{ outline: "none" },

	"&.MuiDataGrid-root .MuiDataGrid-cell": {
		whiteSpace: "normal !important",
		wordWrap: "break-word !important",
		lineHeight: "25px !important",
	},
	
	"&.MuiDataGrid-columnHeaders": { borderBottom: "none !important", padding: "0px" },
	".justifyContentBold": {
		fontSize: "16px",
		fontWeight: "600",
		"&>div": {
			display: "flex !important",
			alignItems: "center",
		},
	},
	".MuiDataGrid-columnSeparator": { display: "none" },
	".MuiDataGrid-cell ": { padding: "0px", borderBottom: "none" },
	".MuiDataGrid-virtualScroller": {
		"&.Mui-hovered": {
			backgroundColor: "inherit",
		},
	},

	".justifyContentNormal": {
		fontSize: "16px",
		fontWeight: "normal",
		"&>div": {
			display: "flex !important",
			alignItems: "center",
		},
	},
	".justifyContentNormalRight": {
		fontSize: "16px",
		fontWeight: "normal",
		"&>div": {
			display: "flex !important",
			alignItems: "center",
			justifyContent: "right",
		},
	},
	".MuiTablePagination-displayedRows":{
		fontWeight:400
	},
	".MuiTablePagination-actions .MuiIconButton-root:hover":{
		backgroundColor: alpha("#00A1B0", 0.08),
		".MuiSvgIcon-root":{
			color:"#00A1B0"
		}
	},

});

const CustomDataGrid: React.FC<DataGridProps> = (props) => <StyledDataGrid {...props} />;

export default CustomDataGrid;
