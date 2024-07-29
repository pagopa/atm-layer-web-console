import { Grid, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Loading } from "../../Commons/Loading";
import { Ctx } from "../../../DataContext";
import { getProfileIdsArray } from "../../Commons/Commons";
import { SCRITTURA } from "../../../commons/constants";

type Props = {
  handleSubmit: () => void;
  cleanFilter: () => void;
  filterValues: any;
  filterRoutes: string;
  children?: any;
  loadingButton?: boolean;
  createIcon?: boolean;
  handleClick?: any;
};

const FilterTemplate = ({
	handleSubmit,
	cleanFilter,
	filterValues,
	filterRoutes,
	children,
	loadingButton,
	createIcon,
	handleClick,
}: Readonly<Props>) => {
	const navigate = useNavigate();

	const {loggedUserInfo} = useContext(Ctx);
	const loggedUserProfiles = getProfileIdsArray(loggedUserInfo);
	const canCreate = loggedUserProfiles.includes(SCRITTURA);

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
						{createIcon ?
							 <Box my={1}>
							 <Button variant="contained" onClick={() => handleClick()} disabled={canCreate ? false : true}>
				 Crea Nuovo
							 </Button>
						 </Box>
						 :
							<Box my={1}>
								<Button variant="contained" onClick={() => navigate(filterRoutes)} disabled={canCreate ? false : true}>
                Crea Risorsa
								</Button>
							</Box>
						}
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
