import { Navigate, useLocation } from "react-router-dom";
import { useCheckinUser } from "../hooks/checkin.hook";

interface ProtectedRouteProps {
  isPrivate?: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({
  isPrivate = false,
  children,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { userCode } = useCheckinUser();

  if (isPrivate === !!userCode) {
    return children;
  }
  return (
    <Navigate
      to={isPrivate ? "/login" : "/dash"}
      state={{ from: location }}
      replace
    />
  );
};

export default ProtectedRoute;
