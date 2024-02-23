import { LoadingButton } from "@mui/lab";
import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  handleSubmit: () => void;
  cleanFilter: () => void;
  filterValues: any;
  filterRoutes: string;
  children?: any;
  loading?: boolean;
};

const FilterTemplate = ({
	handleSubmit,
	cleanFilter,
	filterValues,
	filterRoutes,
	children,
	loading
}: Readonly<Props>) => {
	const navigate = useNavigate();

	const disabledButtons = () => {
		if (!Object.values(filterValues).some((value) => value !== "")) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<Box py={2}>
			<Grid container spacing={2}>
				{children}
				<Grid item xs={12}>
					<Box
						display={"flex"}
						flexDirection={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
					>
						<Box my={1}>
							<Button variant="contained" onClick={() => navigate(filterRoutes)}>
                Crea Risorsa
							</Button>
						</Box>

						<Box>
							<Button
								sx={{ marginRight: 2 }}
								variant="outlined"
								// disabled={disabledButtons()}
								onClick={() => cleanFilter()}
							>
                Cancella Filtri
							</Button>
							<LoadingButton loading={loading} variant="contained" disabled={disabledButtons()} onClick={handleSubmit}>
                Filtra
							</LoadingButton>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterTemplate;
