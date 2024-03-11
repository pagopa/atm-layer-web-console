import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Ctx } from "../DataContext";
import routes from "../routes";
import { Loading } from "../components/Commons/Loading";
import { fetchRequest } from "../hook/fetch/fetchRequest";
import { USER_EMAIL } from "../commons/endpoints";


const LoginPageCallback = () => {
	const { setLogged, abortController, setUserEmail } = useContext(Ctx);
	const navigate = useNavigate();

	useEffect(() => {
		const token = window?.location?.hash?.split("&")[1]?.split("=")[1];
		if (token) {
			setLogged(true);
			localStorage.setItem("jwt_console", token);
			void getTokenEmail();
			navigate(routes.HOME);
		} else {
			navigate(routes.LOGIN);
		}
	}, []);

	const getTokenEmail = async () => {
		try {
			const response = await fetchRequest({ urlEndpoint: USER_EMAIL, method: "GET", abortController })();

			if (response?.success) {
				setUserEmail({ email: response?.valuesObj.email });
			} else {
				setUserEmail("Benvenuto utente");
			}
		} catch (error) {
			console.error("ERROR", error);
		}
	};

	return (
		<Loading />
	);
};

export default LoginPageCallback;