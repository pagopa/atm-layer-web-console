import React, { SetStateAction, forwardRef, useContext }  from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

type Props = {
	titleModal: string;
	contentText: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: any;
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalTemplate({ titleModal, contentText, open, setOpen, handleSubmit }: Props) {
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
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
