import TextField from "@mui/material/TextField";
import { FormControl, Grid, MenuItem } from "@mui/material";
import React, { useContext } from "react";
import { Ctx } from "../../DataContext";
import FilterTemplate from "./FilterTemplate";

type Props = {
	filterValues: any;
	setFilterValues: React.Dispatch<React.SetStateAction<any>>;
	setTableList: React.Dispatch<any>;
	getAllBpmnList: (filterValues: any) => void;
};

export default function FilterBar({ filterValues, setFilterValues, setTableList, getAllBpmnList }: Props) {

	const { abortController } = useContext(Ctx);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
		setFilterValues({ ...filterValues, [fieldName]: event.target.value });
	};

	const handleSubmit = () => {
		if (Object.values(filterValues).some(value => value !== "")) {
			getAllBpmnList(filterValues);
		}
	};

	const cleanFilter = () => {
		setFilterValues({
			functionType: "",
			fileName: "",
			modelVersion: "",
			acquirerId: "",
			status: ""
		});
		
	};

	const menuItems = [
		{ label: "CREATED", value:"CREATED" },
		{ label: "WAITING_DEPLOY", value:"WAITING_DEPLOY" },
		{ label: "UPDATED_BUT_NOT_DEPLOYED", value:"UPDATED_BUT_NOT_DEPLOYED" },
		{ label: "DEPLOYED", value:"DEPLOYED" },
		{ label: "DEPLOY_ERROR", value:"DEPLOY_ERROR" }
	];

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
					label="Banca"
					placeholder="12345"
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
						{menuItems.map((item) => (
							<MenuItem key={item.value} value={item.value}>
								{item.label}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</Grid>
			<Grid item xs={4} />
		</FilterTemplate>
	);
}
