import { Navigate, Outlet } from "react-router-dom"
import { BookWorm } from "../BookWorm"
import { ApplicationViews } from "./ApplicationViews"

export const Authorized = ({children}) => {
  if (localStorage.getItem("bw_token")) {
    return children
  }
  return <Navigate to='/login' replace />
}

