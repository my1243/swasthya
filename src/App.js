import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
  } from "react-router-dom";
import CheckAppointment from "./Components/Admin/CheckAppointment";
import SignIn from "./Components/Admin/SignIn";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NewPatient from "./Components/NewPatient";
import UserSearch from "./Components/UserSearch";

const App = () => {
    return(
        <>
            <Router>
                <Routes>
                    <Route path="/connect-admin" element={<SignIn/>} />
                <Route element={
                    <>
                    <Navbar/>
                    <Outlet/>
                    </>
                }>
                    <Route path="/connect-admin/check-appointment" element={<CheckAppointment/>}/>
                </Route>
                    <Route element={
                        <>
                            <Navbar/>
                            <Outlet/>
                        </>
                    }>
                        <Route path="/" element={<Home/>} />
                        <Route path="/user-search" element={<UserSearch/>} />
                        <Route path="/new-patient" element={<NewPatient/>} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;