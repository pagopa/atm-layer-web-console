
import { FormControl, TextField, MenuItem } from "@mui/material";

type Prop = {
	filterValues: any;
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void;
};

const StatusFilter = ({ filterValues, handleChange }: Prop) => {
	const menuItems = [
		{ label: "STATO", value: "" },
		{ label: "CREATED", value: "CREATED" },
		{ label: "WAITING_DEPLOY", value: "WAITING_DEPLOY" },
		{ label: "UPDATED_BUT_NOT_DEPLOYED", value: "UPDATED_BUT_NOT_DEPLOYED" },
		{ label: "DEPLOYED", value: "DEPLOYED" },
		{ label: "DEPLOY_ERROR", value: "DEPLOY_ERROR" },
	];

	return (
		<FormControl fullWidth>
			<TextField
				id="status"
				name="status"
				value={filterValues.status}
				label="Stato"
				select
				onChange={(e) => handleChange(e, e.target.name)}
				size="small"
				inputProps={{
					"data-testid": "status-test"
				}}
			>
				{menuItems.map((item: any) => (
					<MenuItem key={item.value} value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</TextField>
		</FormControl>
	);
};

export default StatusFilter;
