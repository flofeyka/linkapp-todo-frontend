import './App.css';
import {Provider, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import {store} from "./redux/store";
import {NextUIProvider} from "@nextui-org/react";
import Landing from "./components/Landing/Landing";
import Register from "./components/Auth/Register";

function App() {
    const isAuth = useSelector(state => state.Auth.isAuth)
    if (!isAuth) {
        return <Routes>
            <Route path={"*"} element={<Landing/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
        </Routes>
    }

    return <div>
        Prosto debil
    </div>
}

function AppHOC() {
    return <Provider store={store}>
        <NextUIProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </NextUIProvider>
    </Provider>
}

export default AppHOC;
