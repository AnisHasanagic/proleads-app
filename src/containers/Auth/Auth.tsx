import React, { Suspense, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, ButtonTypes } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { login } from "../../store/user/user.actions";

import logo from "../../assets/logo.svg";
import "./Auth.scss";

function Auth() {
    const navigate = useNavigate();

    const INITIAL_USER = {
        username: "",
        password: "",
    };

    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user);

    const [newLoginUser, setNewLoginUser] = useState<any>(INITIAL_USER);
    const [newLoginUserErrors, setNewLoginUserErrors] = useState<any>({});

    const [name, setName] = useState("");
    const [room, setRoom] = useState("onlineUsers");

    const changeEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        setNewLoginUser({
            ...newLoginUser,
            [name]: value ? value.trim() : "",
        });
    };

    const loginUser = (): void => {
        dispatch(login(newLoginUser.username, newLoginUser.password, navigate));
        setName(newLoginUser.username);
    };

    const handleKeypress = (e: any): void => {
        if (e.key === "Enter") {
            e.stopPropagation();
            e.preventDefault();
            loginUser();
        }
    };

    useEffect(() => {
        if (user.errors) {
            setNewLoginUserErrors(user.errors);
        }
    }, [user]);

    useEffect(() => {
        if (user.token) {
            navigate("/dashboard");
        }
    }, [user.token]);

    return (
        <div id="page">
            <div id="auth">
                <div>
                    <img className="logo-image" src={logo} alt="" />
                </div>
                <h1 id="head">Welcome Back!</h1>
                <h2 id="underHeader">Log in to your ProLeads account</h2>
                <div className="sign-box">
                    <div className="form-box">
                        <Form>
                            <Input
                                id={"loginUsername"}
                                type={"username"}
                                className="username"
                                name={"username"}
                                value={newLoginUser["username"]}
                                onKeyPress={(e: any): void => handleKeypress(e)}
                                onChange={(e: any): void => changeEvent(e)}
                                errors={newLoginUserErrors["username"]}
                                placeholder={"Username"}
                                label="Username"
                            />
                            <Input
                                id={"loginPassword"}
                                type={"password"}
                                className="pass"
                                name={"password"}
                                value={newLoginUser["password"]}
                                onKeyPress={(e: any): void => handleKeypress(e)}
                                onChange={(e: any): void => changeEvent(e)}
                                errors={newLoginUserErrors["password"]}
                                placeholder={"Password"}
                                label="Password"
                            />
                            <Button
                                onClick={() => loginUser()}
                                btnClass={ButtonTypes.primary}
                                big
                                loading={user.loading}
                                disabled={
                                    user.loading ||
                                    !newLoginUser.username ||
                                    !newLoginUser.password
                                }
                            >
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
