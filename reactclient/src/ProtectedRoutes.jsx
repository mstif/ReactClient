/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {

    const [isLogged, setIsLogged] = useState(false);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        fetch('/api/securewebsite/xhtlekd/', {
            method: "GET",
            credentials: "include"
        }).then(response => {
            if (response.ok) {
                setWaiting(false);
                setIsLogged(true);
            }
            return response.json();
        }).then(data => {
          localStorage.setItem("user", data.user.user.email);
          localStorage.setItem("userId", data.user.user.id);
          localStorage.setItem("roles", data.user.roles);
          localStorage.setItem("settingsUser", data.user.user.settingsUser);
            console.log(data.user);
        }).catch(err => {
            console.log("Error protected routes: ", err);
            setWaiting(false);
          localStorage.removeItem("user");
          localStorage.removeItem("roles");
          localStorage.removeItem("userId");
          localStorage.removeItem("settingsUser");
        });
    }, []);

    return waiting ? <div className="waiting-page">
        <div>Waiting...</div>
    </div> :
        isLogged ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
