import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
  } from "react-router-dom";
import BookAppointment from "./Components/Admin/BookAppointment";
import CheckAppointment from "./Components/Admin/CheckAppointment";
import Home1 from "./Components/Admin/Home";
import NewDoctor from "./Components/Admin/NewDoctor";
import Slidebar from "./Components/Admin/Sidebar";
import SignIn from "./Components/Admin/SignIn";
import UpdatePatient from "./Components/Admin/UpdatePatient";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NewPatient from "./Components/Admin/NewPatient";
import UserSearch from "./Components/UserSearch";
import { createContext, useReducer, useState } from "react";
import Login from "./Components/Login";

export const UserContext = createContext();
const App = () => {
    const [doct,setDoct] = useState({});
    const [flag,setFlag] = useState(false);
    // const [isLogin, setisLogin] = useState(false);
    return(
        <>
            <Router>
                <Routes>
                    <Route element={
                        <>
                        <div className="flex">
                            <Slidebar/>
                            <Outlet/>
                        </div>
                        </>
                    }>
                        <Route path="connect-admin/home" element={<Home1/>}/>
                        <Route path="/connect-admin/check-appointment" element={<CheckAppointment/>}/>
                        <Route path="/connect-admin/new-doctor" element={<NewDoctor/>}/>
                        <Route path="/connect-admin/update-patient" element={<UpdatePatient/>}/>
                        <Route path="/connect-admin/book-appointment" element={<BookAppointment/>}/>
                        <Route path="/connect-admin/new-patient" element={<NewPatient/>} />
                    </Route>
                    <Route path="/connect-admin" element={<SignIn/>} />
                    <>
                    <Route element={
                        <>
                            <Navbar doct = {doct} setDoct = {setDoct}/>
                            <Outlet/>
                        </>
                    }>
                        <Route path="/user-search" element={<UserSearch setDoct = {setDoct}/>} />
                        <Route path="/" element={<Home/>} />
                        <Route path="/login" element={<Login/>} />
                    </Route>
            </>
                    <Route path="/sidebar" element={<Slidebar/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App;