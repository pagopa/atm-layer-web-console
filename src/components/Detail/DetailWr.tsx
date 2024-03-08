import { useState, useEffect } from "react";
import { WORKFLOW_RESOURCE } from "../../commons/constants";
import DetailBody from "./DetailBody";


type Props = {
    detailFields: any;
    detailTitle: string;
    breadComponent: any;
};

const DetailWr = ({
	detailFields,
	detailTitle,
	breadComponent
}: Props) => {
	const [detail, setDetail] = useState({});

	useEffect(() => {
		const storedRecordParams = sessionStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);

	
	return (
		<DetailBody 
			detail={detail}
			driver={WORKFLOW_RESOURCE}
			detailFields={detailFields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
		/>
	);
};

export default DetailWr;