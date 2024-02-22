import React, {FC, Suspense, useEffect} from "react";
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {initiliazeApp}  from "./redux/AppReducer";
import {Provider, useDispatch, useSelector} from "react-redux";
import InitializationPage from "./components/Preloader/Initialization/InitializationPage.jsx";
import store from "./redux/ReduxStore";

const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Header = React.lazy(() => import("./components/Header/Header"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Login = React.lazy(() => import("./components/Auth/Login/Login"));
const Register = React.lazy(() => import("./components/Auth/Register/Register"));
const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"));
const Profile = React.lazy(() => import ("./components/Profile/Profile"));
const Friends = React.lazy(() => import("./components/Friends/Friends"));
const Feed = React.lazy(() => import("./components/Feed/Feed"));
const Community = React.lazy(() => import("./components/Community/Community"));
const Video = React.lazy(() => import("./components/Video/Video"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));


function App() {
    const [initialized, isAuth]:any = useSelector((state: any) => [state.App.initialized, state.AuthPage.isAuth]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initiliazeApp());
    }, [isAuth]);

    if (!initialized) {
        return <InitializationPage/>
    } else if (!isAuth) {
        return <Suspense fallback={<InitializationPage/>}>
            <div className="AuthContainer">
                <Routes>
                    <Route path='*' element={<Navigate to="/auth"/>}/>
                    <Route path='/auth' element={<Auth/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </div>
        </Suspense>

    }

    return <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
            <Routes>
                <Route path='/user/:userId' element={<Profile/>}/>
                <Route path='/dialogs' element={<Dialogs/>}/>
                <Route path='/dialogs/:dialogId' element={<Dialogs/>}/>
                <Route path='/feed' element={<Feed/>}/>
                <Route path='/community' element={<Community/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path='/videos' element={<Video/>}/>
                <Route path='/music' element={<Music/>}/>
                <Route path='/settings' element={<Settings/>}/>
                <Route path='*' element={<Navigate to="/feed"/>}/>
            </Routes>
        </div>
    </div>
}

function AppProvider() {
    return <Suspense fallback={<InitializationPage/>}>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </Suspense>

}

export default AppProvider;
