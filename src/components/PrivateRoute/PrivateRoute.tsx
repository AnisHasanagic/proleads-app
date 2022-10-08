import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIfUserIsAuthenticated } from "../../store/user/user.actions";

export const PrivateRoute = (props: any): any => {
    const { children, roles } = props;

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        (async (): Promise<void> => {
            if (!user.userChecked) dispatch(checkIfUserIsAuthenticated());
        })();
    }, []);

    if (!user.userChecked) return null;

    if (user.userChecked && !user.token) return <Navigate replace to="/" />;


    if (
        user.userChecked &&
        user.token &&
        user.role &&
        (!roles.includes(user.role) ||
            (roles.includes(user.role) &&
                user.role !== "admin" &&
                user.role !== "agent"))
    )
        return <Navigate replace to="/" />;

    return children;
};
