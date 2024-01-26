import { styled, useTheme } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

export const CustomDataGrid: React.FC<DataGridProps> = (props) => {

	const theme = useTheme();

	const StyledDataGrid = styled(DataGrid)({
		border: "none !important",
		boxShadow: "0px 16px 32px rgba(0, 0, 0, 0.2)",
		"& .MuiDataGrid-main": {
			// padding: "0 24px 24px 24px",
		},
		"&.MuiDataGrid-root .MuiDataGrid-columnHeaders" : {
			backgroundColor: theme.palette.primary.main,
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
		// ".MuiDataGrid-row": {
		// 	backgroundColor: "white",
		// 	"&.Mui-selected": {
		// 		backgroundColor: "transparent",
		// 		"&:hover": { backgroundColor: "transparent" },
		// 	},
		// 	"&:hover": {
		// 		backgroundColor: "rgba(23, 50, 77, 0.04)",
		// 	},
		// },
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

	return <StyledDataGrid {...props} />;
};
