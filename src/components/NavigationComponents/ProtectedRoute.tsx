import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import routes from "../../routes";
import { Ctx } from "../../DataContext";
import { getProfileIdsArray } from "../Commons/Commons";

type Props = {
	profileRequired:number;
};

const ProtectedRoute = ({profileRequired}:Props) => {
	const navigate = useNavigate();
	const { loggedUserInfo } = useContext(Ctx);
  
	useEffect(() => {
		if (loggedUserInfo.userId && !getProfileIdsArray(loggedUserInfo)?.includes(profileRequired)) {
			navigate(routes.UNAUTHORIZED_PAGE);
		}
	}, [loggedUserInfo, navigate]);
  
	return <Outlet />;
};
  
export default ProtectedRoute;
