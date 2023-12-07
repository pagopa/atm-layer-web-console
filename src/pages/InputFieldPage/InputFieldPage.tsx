import { Box } from "@mui/system";
import { theme } from "@pagopa/mui-italia";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useRef, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { useFormik } from "formik";
import { Header } from "../../components/Header";
import { TitleComponent } from "../../components/TitleComponents/TitleComponent";
import { getCompletePathImage } from "../../utils/Commons";
import { CustomTextField } from "../../components/CustomTextField/CustomtextField";
import { Footer } from "../../components/Footer";


type InputFieldDto = {
	code: string;
};

export const InputFieldPage = () => {
	const backButton = () => console.log("Bottone");

	const [charCounter, setCharCounter] = useState(0);
	const [endIconVisible, setEndIconVisible] = useState(true);

	useEffect(() => {
		console.log("counter", charCounter);
	}, [charCounter]);

	const validate = (values: InputFieldDto) =>
		Object.fromEntries(
			Object.entries({
				code: values.code.length < 18
					? setEndIconVisible(true)
					: undefined,
			}).filter(([_key, value]) => (typeof value !== "undefined" ? value : ""))
		);

	const formik = useFormik({
		initialValues: {
			code: "",
		},
		validate,
		onSubmit: (values) => {
			console.log("values:", values);
		},
	});

	const enebledSubmit = (values: InputFieldDto) => !!(values.code !== "");

	return (
		<>
			<Header
				bankTitle="Test"
				bankLogo={getCompletePathImage("icon-52x52.png")}
				serviceDescription="Servizi di pubblica utilità"
			/>
			<Box marginTop={theme.spacing(3)} textAlign={"center"}>
				<TitleComponent
					title={"Inserisci il codice avviso"}
					subTitle={"Ha 18 cifre, lo trovi vicino al codice QR."}
				/>
			</Box>
			<Box display={"flex"} minHeight="70vmin" justifyContent={"center"} alignItems={"center"}>
				{/* <Box justifyContent={"center"} minWidth={"25%"}>
					<CustomTextField
						id={"code"}
						name={"code con formik"}
						label={"Codice Avviso"}
						value={formik.values.code}
						error={formik.touched.code && Boolean(formik.errors.code)}
						endIcon={endIconVisible ? <ReportIcon /> : undefined}
						handleChange={(e) => formik.handleChange(e)}
						variant={"outlined"}
					/>
				</Box> */}
				<Box justifyContent={"center"} minWidth={"25%"}>
					<CustomTextField
						id={"code"}
						name={"code con formik"}
						label={"Codice Avviso"}
						value={formik.values.code}
						error={formik.touched.code && Boolean(formik.errors.code)}
						icons={endIconVisible ? "Report" : undefined}
						onChange={(e) => formik.handleChange(e)}
						variant={"outlined"}
					/>
				</Box>
			</Box>
			<Footer
				backButton={backButton}
				disabled={!enebledSubmit(formik.values)}
				handleClick={formik.handleSubmit}
				continueButton={"Continua"}
				endIcon={<ChevronRightIcon color="primary" fontSize="medium" sx={{ ml: "16px" }} />}
			/>
		</>
	);
};
