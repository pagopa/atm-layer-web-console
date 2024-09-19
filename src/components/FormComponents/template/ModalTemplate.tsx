import React from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

type Props = {
  titleModal: string;
  contentText: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: any;
  children?: React.ReactNode;
  loading?: boolean;
  handleClose?: any;
//   canOnlyConfirm?: boolean;
};

export default function ModalTemplate({
	titleModal,
	contentText,
	open,
	setOpen,
	handleSubmit,
	children,
	loading,
	handleClose,
	// canOnlyConfirm,
}: Props) {
	const handleDialogClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const theme = useTheme();

	const defaultHandleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={(e, reason) => {
				if (reason !== "backdropClick") {
					setOpen(false);
				}
			}}
			fullWidth
			maxWidth={"sm"}
		>
			<Box onClick={handleDialogClick}>
				<DialogTitle sx = {{background : theme.palette.primary.main, color: "white", fontWeight: 600}}>{titleModal}</DialogTitle>
				<Divider />
				<Box py={2}>
					<DialogContent>
						<DialogContentText>{contentText}</DialogContentText>
					</DialogContent>
				</Box>
				{children}
				<DialogActions>
					<Box display={"flex"} flexDirection={"row"} p={2}>
						<Box mr={2} /* sx={{ display: canOnlyConfirm ? "none" : null }} */>
							<Button variant={"outlined"} onClick={handleClose || defaultHandleClose}>
                Annulla
							</Button>
						</Box>
						<Box>
							<LoadingButton loading={loading} variant={"contained"} onClick={handleSubmit}>
                Conferma
							</LoadingButton>
						</Box>
					</Box>
				</DialogActions>
			</Box>
		</Dialog>
	);
}
