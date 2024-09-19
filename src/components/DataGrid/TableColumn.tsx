import { Typography, Box, IconButton, useTheme, Tooltip } from "@mui/material";
import { GridColDef, GridColumnHeaderParams, GridRenderCellParams } from "@mui/x-data-grid";
import { generatePath, useNavigate } from "react-router-dom";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CSSProperties, ReactNode } from "react";
import { DELETE_ASSOCIATION, DELETE_BANK, DELETE_USER, SCRITTURA, UPDATE_USER, BANKS } from "../../commons/constants";
import useColumns from "../../hook/Grids/useColumns";
import { getProfileDescriptionFromStorage } from "../Commons/Commons";
import { fetchRequest } from "../../hook/fetch/fetchRequest";
import { GET_BANK } from "../../commons/endpoints";
import { Profile } from "../../model/UserModel";


const TableColumn = (setOpen?: any, setType?: any) => {

	const { getColumnsGrid, getVisibleColumns, getNavigationPaths } = useColumns();
	const buildColumnDefs = (driver: string) => {
		const cols = getColumnsGrid(driver, showCustomHeader, renderCell, actionColumn, deleteColumn, deleteColumnUsers, editColumnUsers);
		return cols as Array<GridColDef>;
	};
	const visibleColumns = (driver: string) => getVisibleColumns(driver);
	const navigate = useNavigate();
	const theme = useTheme();

	function showCustomHeader(params: GridColumnHeaderParams, overrideStyle: CSSProperties = {}) {
		return (
			<Typography
				color={theme.palette.primary.contrastText}
				variant="body2"
				sx={{
					display: "-webkit-box",
					WebkitLineClamp: 2,
					WebkitBoxOrient: "vertical" as const,
					whiteSpace: "normal"
				}}
			>
				{params.colDef.headerName}
			</Typography>
		);
	};

	function renderCell(
		params: any,
		value: ReactNode = params.value,
		overrideStyle: CSSProperties = {}
	) {
		return (
			<Box
				px={1.5}
				width="100%"
				height="100%"
				sx={{
					WebkitBoxOrient: "vertical" as const,
					...overrideStyle,
				}}
			>
				<Box
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical" as const,
						width: "100%"
					}}
				>
					<Tooltip
						placement="bottom-start"
						title={<span> {value}</span>}
					>
						<Typography variant="body1">
							{value}
						</Typography>
					</Tooltip>
				</Box>
			</Box>
		);
	}

	const actionColumn = (param: any, dataType: string) => {
		const handleClick = async () => {
			const path = getNavigationPaths(dataType, param);

			if (dataType === BANKS) {
				const acquirerId = param.row.acquirerId;

				try {
					const response = await fetchRequest({
						urlEndpoint: generatePath(GET_BANK, { acquirerId }),
						method: "GET",
					})();

					if (response.valuesObj) {
						sessionStorage.setItem("recordParamsBank", JSON.stringify(response.valuesObj));
						navigate(path);
					} else {
						console.error("No data found in response");
					}
				} catch (error) {
					console.error("ERROR", error);
				}
			} else {
				sessionStorage.setItem("recordParams", JSON.stringify(param.row));
				navigate(path);
			}
		};

		return (
			<Box
				display="flex"
				justifyContent="flex-end"
				width="30%"
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={handleClick}
					sx={{
						width: "100%",
						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="action-column-test"
				>
					<ArrowForwardIos sx={{ color: "primary.main", fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};

	const deleteColumn = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(DELETE_ASSOCIATION);
			sessionStorage.setItem("recordParamsAssociated", JSON.stringify(param.row));
		};
		if(getProfileDescriptionFromStorage(sessionStorage.getItem("loggedUserInfo"))?.includes(SCRITTURA)) {
			return (
				<Box
					width="100%"
					display="flex"
					justifyContent={"center"}
					sx={{ cursor: "pointer" }}
				>
					<IconButton
						onClick={actions}
						sx={{
	
							"&:hover": { backgroundColor: "transparent !important" },
						}}
						data-testid="delete-column-test"
					>
						<DeleteIcon sx={{ color: theme.palette.error.main, fontSize: "24px" }} />
					</IconButton>
				</Box>
			);
		}
	};

	const deleteColumnUsers = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(DELETE_USER);
			sessionStorage.setItem("recordParamsUser", JSON.stringify(param.row));
		};

		// eslint-disable-next-line functional/no-let
		let loggedUserInfo;
		const recordUser = sessionStorage.getItem("loggedUserInfo");
		try {
			loggedUserInfo = recordUser ? JSON.parse(recordUser) : {
				userId: "",
				name:"",
				surname:"",
				createdAt: "",
				lastUpdatedAt: "",
				profiles: [] as Array<Profile>
			};
		} catch (exception) {
			loggedUserInfo = {
				userId: "",
				name:"",
				surname:"",
				createdAt: "",
				lastUpdatedAt: "",
				profiles: [] as Array<Profile>
			};
		}


		return (
			<Box
				width="100%"
				display="flex"
				justifyContent={"center"}
				sx={{ cursor: "pointer" }}
			>
				{loggedUserInfo && loggedUserInfo?.userId !== param.row.userId && 
				<IconButton
					onClick={actions}
					sx={{

						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="delete-column-test"
				>
					<DeleteIcon sx={{ color: theme.palette.error.main, fontSize: "24px" }} />
				</IconButton>
				}
			</Box>
		);
	};

	const deleteColumnBank = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(DELETE_BANK);
			sessionStorage.setItem("recordParamsBank", JSON.stringify(param.row));
		};

		return (
			<Box
				width="100%"
				display="flex"
				justifyContent={"center"}
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={actions}
					sx={{

						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="delete-column-test"
				>
					<DeleteIcon sx={{ color: theme.palette.error.main, fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};

	const editColumnUsers = (param: any) => {

		const actions = () => {
			setOpen(true);
			setType(UPDATE_USER);
			sessionStorage.setItem("recordParamsUser", JSON.stringify(param.row));
		};

		return (
			<Box
				width="100%"
				display="flex"
				justifyContent={"center"}
				sx={{ cursor: "pointer" }}
			>
				<IconButton
					onClick={actions}
					sx={{

						"&:hover": { backgroundColor: "transparent !important" },
					}}
					data-testid="edit-column-test"
				>
					<EditIcon sx={{ color: theme.palette.primary.main, fontSize: "24px" }} />
				</IconButton>
			</Box>
		);
	};

	return {
		buildColumnDefs,
		actionColumn,
		renderCell,
		showCustomHeader,
		visibleColumns,
		deleteColumn,
		deleteColumnBank,
		deleteColumnUsers,
		editColumnUsers,
	};
};

export default TableColumn;