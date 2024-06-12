import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Commons/Loading";

type Props = {
  handleSubmit: () => void;
  cleanFilter: () => void;
  filterValues: any;
  filterRoutes: string;
  children?: any;
  loadingButton?: boolean;
};

const FilterTemplate = ({
	handleSubmit,
	cleanFilter,
	filterValues,
	filterRoutes,
	children,
	loadingButton
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
								onClick={() => cleanFilter()}
							>
                Cancella Filtri
							</Button>

							<Button variant="contained" disabled={disabledButtons()} onClick={handleSubmit}>
								{loadingButton ? <Loading size={20} thickness={5} marginTop={"0px"} color={"white"} /> : "Filtra"}
							</Button>

						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default FilterTemplate;
