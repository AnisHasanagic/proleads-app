import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "intro.js/introjs.css";
import "animate.css";
import "./App.scss";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Routes, Route } from "react-router-dom";


const Auth = React.lazy(() => import("./containers/Auth/Auth"));


function App() {
    return (
        <Provider store={store}>
                <Routes>
                    
                    <Route
                        path="/auth"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                    <Auth />
                            </React.Suspense>
                        }
                    />
        
                </Routes>
        </Provider>
    );
}

export default App;