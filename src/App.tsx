import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "intro.js/introjs.css";
import "animate.css";
import "./App.scss";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute/GuestRoute";
import AdminExport from "./containers/AdminPanel/AdminExport/AdminExport";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const AdminUsers = React.lazy(()=>import("./containers/AdminPanel/AdminUsers/AdminUsers"))
const AdminCompany = React.lazy(()=>import("./containers/AdminPanel/AdminCompany/AdminCompanies"))
const Dashboard = React.lazy(()=>import("./containers/Dashboard/Dashboard"))
const AgentList = React.lazy(()=>import("./containers/AgentList/AgentList"))

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                   <PrivateRoute roles={["agent","admin"]}>
                                    <Dashboard />
                                    </PrivateRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <GuestRoute>
                                    <Auth />
                                 </GuestRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/dashboard/admin-panel/users"
                        element={
                            <React.Suspense fallback={<>...</>}>
                         <PrivateRoute roles={["admin"]}>
                                    <AdminUsers />
                            </PrivateRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/dashboard/admin-panel/company"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                 <PrivateRoute roles={["admin"]}>
                 
                                    <AdminCompany />
                                </PrivateRoute>
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="/dashboard/admin-panel/calls"
                        element={
                            <React.Suspense fallback={<>...</>}>
                         <PrivateRoute roles={["admin"]}>
                                    <AdminExport />
                            </PrivateRoute>
                            </React.Suspense>
                        }
                    />
                     <Route
                        path="/dashboard/company"
                        element={
                            <React.Suspense fallback={<>...</>}>
                            <PrivateRoute roles={["admin","agent"]}>

                                    <AgentList />
                            </PrivateRoute>
                            </React.Suspense>
                        }
                    />
                </Routes>
                </BrowserRouter>
        </Provider>
    );
}

export default App;