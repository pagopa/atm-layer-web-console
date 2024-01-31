import { Grid, Button, Box, useTheme } from "@mui/material";
import React, { FormEventHandler } from "react";

type Props = {
    handleSubmit: () => void;
    cleanFilter: () => void;
    children?: any;
};

const FilterTemplate = ({ handleSubmit, cleanFilter, children }: Readonly<Props>) => {
	const theme = useTheme();

	return (
		<Box p={2} border={"1px solid"+ theme.palette.divider}>
			<Grid container spacing={2}>
				{children}
				<Grid item xs={12}>
					<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-end"}>
						<Box mr={2}>
							<Button variant="outlined" onClick={() => cleanFilter()}>Cancella Filtri</Button>
						</Box>
						<Box>
							<Button variant="contained" onClick={() => handleSubmit()}>Filtra</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
	
		</Box>
	);
};

export default FilterTemplate;
