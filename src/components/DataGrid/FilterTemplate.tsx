import { Grid, Button, Box, useTheme, ListItemIcon } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {

    handleSubmit: () => void;
    cleanFilter: () => void;
    children?: any;
};

const FilterTemplate = ({ handleSubmit, cleanFilter, children }: Readonly<Props>) => {
	const theme = useTheme();

	const navigate = useNavigate();

	const inputGroupStyle = {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: theme.palette.divider,
		position: "static",
		padding: 2,
	};

	return (
		<Box sx={inputGroupStyle}>
			<Grid container display={"flex"} flexDirection={"column"} >
				<Grid container spacing={1}>
					{children}
					<Grid item xs={12}>
						
						<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>

							<Box>
								<Button variant="contained" onClick={() => navigate(ROUTES.CREATE_BPMN)}>
									Crea Risorsa
								</Button>
							</Box>
							
							<Box >
								<Button sx={{marginRight: 2}} variant="outlined" onClick={() => cleanFilter()}>Cancella Filtri</Button>
								<Button variant="contained" onClick={() => handleSubmit()}>Filtra</Button>
							</Box>

						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterTemplate;
