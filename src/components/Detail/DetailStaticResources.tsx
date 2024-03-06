import { useState, useEffect } from "react";
import { RESOURCES } from "../../commons/constants";
import DetailBody from "./DetailBody";

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

	useEffect(() => {
		const storedRecordParams = sessionStorage.getItem("recordParams");
		if (storedRecordParams) {
			setDetail(JSON.parse(storedRecordParams));
		}
	}, []);


	return (
		<DetailBody 
			detail={detail}
			driver={RESOURCES}
			detailFields={detailFields}
			detailTitle={detailTitle}
			breadComponent={breadComponent}
		/>
	);
};

export default DetailStaticResources;