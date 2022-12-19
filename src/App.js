import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
  } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import NewPatient from "./Components/NewPatient";
import UserSearch from "./Components/UserSearch";

const App = () => {
    return(
        <>
            <Router>
                <Routes>
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