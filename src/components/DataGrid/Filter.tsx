import TextField from "@mui/material/TextField";
import { FormControl, Grid, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import fetchGetAllFiltered from "../../hook/fetch/fetchGetAllFiltered";
import FilterTemplate from "./FilterTemplate";

type Props = {
	filterValues: any;
	setFilterValues: React.Dispatch<React.SetStateAction<any>>;
	setTableList: React.Dispatch<any>;
};

export default function FilterBar({ filterValues, setFilterValues, setTableList }: Props) {

	const { abortController } = useContext(Ctx);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
		setFilterValues({ ...filterValues, [fieldName]: event.target.value });
	};

	const handleSubmit = () => {
		const getAllBpmn = new Promise((resolve) => {
			void fetchGetAllFiltered({
				abortController, pageIndex: 0, pageSize: 10, headerParams: {
					"functionType": filterValues.functionType,
					"fileName": filterValues.fileName,
					"modelVersion": filterValues.modelVersion,
					"acquirerId": filterValues.acquirerId,
					"status": filterValues.status,
				}
			})()
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
				console.log("GET ALL BPMN RESPONSE FILTER", res);
				setTableList(res.data);
			})
			.catch((err) => {
				console.log("GET ALL BPMN ERROR FILTER", err);
				setTableList([]);
			});
	};

	const cleanFilter = () => {
		setFilterValues( {
			functionType: "",
			fileName: "",
			modelVersion: "",
			acquirerId: "",
			status: ""
		});
	};

	return (
		<FilterTemplate handleSubmit={handleSubmit} cleanFilter={cleanFilter}>
			<Grid item xs={4}>
				<TextField
					id="functionType"
					name="functionType"
					label="Tipo Funzione"
					variant="outlined"
					value={filterValues.functionType}
					onChange={(e) => handleChange(e, e.target.name)}
					size="small"
					fullWidth
				/>
			</Grid>

			<Grid item xs={4}>
				<TextField
					id="fileName"
					name="fileName"
					label="Nome File"
					value={filterValues.fileName}
					onChange={(e) => handleChange(e, e.target.name)}
					variant="outlined"
					size="small"
					fullWidth
				/>
			</Grid>

			<Grid item xs={4}>
				<TextField
					id="modelVersion"
					name="modelVersion"
					label="Versione"
					value={filterValues.modelVersion}
					type="number"
					onChange={(e) => handleChange(e, e.target.name)}
					variant="outlined"
					fullWidth
					size="small"
				/>
			</Grid>

			<Grid item xs={4}>
				<TextField
					id="acquirerId"
					name="acquirerId"
					label="Acquirer Id"
					value={filterValues.acquirerId}
					onChange={(e) => handleChange(e, e.target.name)}
					variant="outlined"
					fullWidth
					size="small"
				/>
			</Grid>

			<Grid item xs={4}>
				<FormControl fullWidth>
					<TextField
						id="status"
						name="status"
						value={filterValues.status}
						label="Stato"
						select
						onChange={(e) => handleChange(e, e.target.name)}
						size="small"
					>
						<MenuItem value="CREATED">CREATED</MenuItem>
						<MenuItem value="WAITING_DEPLOY">WAITING_DEPLOY</MenuItem>
						<MenuItem value="UPDATED_BUT_NOT_DEPLOYED">UPDATED_BUT_NOT_DEPLOYED</MenuItem>
						<MenuItem value="DEPLOYED">DEPLOYED</MenuItem>
						<MenuItem value="DEPLOY_ERROR">DEPLOY_ERROR</MenuItem>
					</TextField>
				</FormControl>
			</Grid>
			<Grid item xs={4} />
		</FilterTemplate>
	);
}
