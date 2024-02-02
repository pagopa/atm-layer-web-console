import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
    handleSubmit: () => void;
    cleanFilter: () => void;
    children?: any;
};

const FilterTemplate = ({ handleSubmit, cleanFilter, children }: Readonly<Props>) => {
	const navigate = useNavigate();

	return (
		<Box p={2} >
			<Grid container spacing={2}>
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
							<Button variant="contained" onClick={handleSubmit}>Filtra</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterTemplate;
