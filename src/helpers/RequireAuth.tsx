import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { userEmail } = useAuth();
  let location = useLocation();

  if (userEmail === null) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return children;
}
