import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import formOption from "../../../hook/formOption";
import IconBox from "../../Commons/IconBox";
import { TitleComponent } from "../../TitleComponents/TitleComponent";
import { CustomDataGrid } from "../../DataGrid/CustomDataGrid";
import { buildColumnDefs } from "../../DataGrid/TableColumn";
import fetchGetAllFiltered from "../../../hook/fetch/fetchGetAllFiltered";
import { Ctx } from "../../../DataContext";

export const TableBpmn = () => {
	const theme = useTheme();
	const [bpmnList, setBpmnList] = useState<any>([]);
	const { getFormOptions } = formOption();
	const { abortController } = useContext(Ctx);
	const pageIndex = 0;
	const pageSize = 10;

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
	};

	const rowHeight = 64;

	const columns: Array<GridColDef> = buildColumnDefs();

	useEffect(() => {

		const getAllBpmn = new Promise((resolve) => {
			void fetchGetAllFiltered({ abortController, pageIndex, pageSize })()
				.then((response: any) => {
					if (response?.success) {
						resolve({
							data: response.valuesObj,
							type: "SUCCESS"
						});
					} else {
						resolve({ 
							type: "ERROR"
						});
					}
				})
				.catch((err) => {
					console.log("ERROR", err);
				});
		});

		getAllBpmn
			.then((res: any) => {
				console.log("GET ALL BPMN RESPONSE", res);
				setBpmnList(res.data);
			})
			.catch((err) =>{
				console.log("GET ALL BPMN ERROR", err);
				setBpmnList([]);
			});
	}, []);

	return (
		<Box sx={{ maxWidth: "75%" }}>
			{getFormOptions("GetAll").map((el: any, ind: any) => (
				<React.Fragment key={el.title}>
					<Box marginTop={3} textAlign={"center"}>
						<TitleComponent title={el.title} subTitle={""} />
					</Box>
					<Box p={3} my={3} mx={"auto"} sx={inputGroupStyle}>
						<Grid container >
							<Grid item xs={12}>
								<Box display="flex" mb={2}>
									<IconBox icon={"EditNote"} marg={"0 0.2em 0  0"} size={"1.8em"} />
									<Typography variant="body1" fontWeight="600">
										{el.description}
									</Typography>
								</Box>
							</Grid>
							<Grid item xs={12}>

								{(<CustomDataGrid
									disableColumnFilter
									disableColumnSelector
									disableDensitySelector
									disableRowSelectionOnClick
									autoHeight={true}
									className="CustomDataGrid"
									columnBuffer={6}
									columns={columns}
									getRowId={(r) => r.bpmnId}
									hideFooterSelectedRowCount={true}
									pagination
									rowHeight={rowHeight}
									rows={bpmnList ?? []}
									rowCount={bpmnList.length}
									sortingMode="client"
									pageSizeOptions={[]}
								/>
								)
								}

							</Grid>
						</Grid>
					</Box>
				</React.Fragment>
			)
			)}
		</Box>
	);
};

export default TableBpmn;
