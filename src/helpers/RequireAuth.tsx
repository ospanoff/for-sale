import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  let location = useLocation();

  if (user === null) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return children;
}
