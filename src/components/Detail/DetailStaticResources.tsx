import { useState, useEffect } from "react";
import ModalResources from "../FormComponents/FormsResources/ModalResources";
import DetailPageTemplate from "../../pages/Layout/DetailPageTemplate";
import ResourcesDetailButtons from "./ResourcesDetailButtons";

type Props = {
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
};

const DetailStaticResources = ({
	detailFields,
	detailTitle,
	breadComponent
}: Props) => {
	const [detail, setDetail] = useState({});
	const [open, setOpen] = useState(false);
	const [type, setType] = useState("");
	const [openSnackBar, setOpenSnackBar] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<"success" | "error">("success");
	const [title, setTitle] = useState("");

	useEffect(() => {
		const storedRecordParams = localStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);


	return (
		<DetailPageTemplate 
			detail={detail} 
			detailFields={detailFields} 
			detailTitle={detailTitle} 
			breadComponent={breadComponent} 
			openSnackBar={openSnackBar} 
			setOpenSnackBar={setOpenSnackBar} 
			type={type} 
			message={message} 
			severity={severity} 
			title={title}
		>
			<ResourcesDetailButtons 
				openDialog={() => setOpen(true)}
				type={type}
				setType={setType}
				detail={detail}
			/>

			<ModalResources
				open={open}
				setOpen={setOpen}
				type={type}
				setOpenSnackBar={setOpenSnackBar}
				setSeverity={setSeverity}
				setMessage={setMessage}
				setTitle={setTitle}
				detail={detail}
			/>
		</DetailPageTemplate>
	);
};

export default DetailStaticResources;