import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

type Props = {
	handleSubmit: () => void;
	cleanFilter: () => void;
	filterValues: any;
	filterRoutes: string;
	children?: any;
};

const FilterTemplate = ({ handleSubmit, cleanFilter, filterValues,  filterRoutes, children }: Readonly<Props>) => {
	const navigate = useNavigate();

	const disabledButtons = () => {
		if (!Object.values(filterValues).some(value => value !== "")) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<Box p={2} >
			<Grid container spacing={2}>
				{children}
				<Grid item xs={12}>
					<Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
						<Box>
							<Button variant="contained" onClick={() => navigate(filterRoutes)}>
								Crea Risorsa
							</Button>
						</Box>

						<Box >
							<Button
								sx={{ marginRight: 2 }}
								variant="outlined"
								disabled={disabledButtons()}
								onClick={() => cleanFilter()}
							>
								Cancella Filtri
							</Button>
							<Button
								variant="contained"
								disabled={disabledButtons()}
								onClick={handleSubmit}
							>
								Filtra
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterTemplate;
