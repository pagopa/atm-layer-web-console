import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const CustomDataGrid = styled(DataGrid)({
	border: "none !important",
	"& .MuiDataGrid-main": {
		// padding: "0 24px 24px 24px",
		marginTop: "24px",
	},
	// "&.MuiDataGrid-root .MuiDataGrid-columnHeaders" : {
	// 	padding: "8px"
	// },
	"&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within":
		{ outline: "none" },

	"&.MuiDataGrid-root .MuiDataGrid-cell": {
		whiteSpace: "normal !important",
		wordWrap: "break-word !important",
		lineHeight: "25px !important",
	},
	"& .MuiDataGrid-columnHeaders": { borderBottom: "none !important", padding: "24px" },
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
	".MuiDataGrid-columnHeaders": { borderBottom: "none" },
	".MuiDataGrid-row": {
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
});
