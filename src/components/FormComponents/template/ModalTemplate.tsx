import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide } from "@mui/material";

type Props = {
	titleModal: string;
	contentText: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: any;
};

export default function ModalTemplate({ titleModal, contentText, open, setOpen, handleSubmit }: Props) {
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			fullWidth
			maxWidth={"sm"}
		>
			<DialogTitle>
				{titleModal}
			</DialogTitle>
			<Divider />
			<Box py={2}>
				<DialogContent>
					<DialogContentText>
						{contentText}
					</DialogContentText>
				</DialogContent>
			</Box>
			<DialogActions >
				<Box display={"flex"} flexDirection={"row"} p={2}>
					<Box mr={2}>
						<Button variant={"outlined"} onClick={() => setOpen(false)}>Annulla</Button>
					</Box>
					<Box>
						<Button variant={"contained"} onClick={handleSubmit}>Conferma</Button>
					</Box>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
