import React from "react";
import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";
import type {RootState} from "../redux/store";


const PublicRoute:React.FC = () => {
    const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated);

    console.log("isloggedIn : ",isAuthenticated);

    if(isAuthenticated){
        return <Navigate to="/" replace />;
    }

  return <Outlet/>
}

export default PublicRoute;
