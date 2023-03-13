import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
// import authenticate from "../functions/authenticate";

const Navbar = (props) => {
    const [user,setUser] = useState({});
    const [flag,setFlag] = useState(false);
    // const {state,dispatch} = useContext(UserContext);

    const authenticate = async () => {
        try{
            const res = await fetch("/dlogged", {
                method:"GET",
                headers:{
                    "Content-Type":"Application/json",
                    "Accept": "Application/json"
                },
                credentials:"include",
            });
    
            const data = await res.json();
            if(data){
                // setFlag(true);
                window.location="/user-search";
            }
        }catch(err){
            // setFlag(false);
            console.log(err);
            // window.location = "/";
        }
    }

    const logoutUser = () => {
        // dispatch({type:"USER", payload:false});
    }
    // useEffect(() => {
    //     authenticate();
    // },[]);

    return(
        <>
            <header class="text-gray-600 body-font">
  <div class="container mx-auto flex p-5 flex-col md:flex-row justify-between items-center">
  <div>
    <Link to={"/"} class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">Swasthya 24/7</span>
    </Link>
    </div>
    <div>
    {/* { Object.keys(props.doct).length > 0 ? 
        <div className="flex flex-row items-center justify-center">
            <div className="h-12 w-12 rounded-full overflow-hidden m-2">
              <img src="/images/avatar.jpg" />
            </div>
            <li className="dropdown mr-8">
              <div className="hover:cursor-pointer">
                <h1 className="font-medium text-md">
                  {props.doct.fname} {props.doct.lname}
                </h1>
                <h3 className="font-medium text-slate-600 text-sm">
                  {props.doct.email}
                </h3>
              </div>
              <div class="dropdown-content">
                <Link to="/portfolio">Dashboard</Link>
                <Link to="/portfolio/view-profile">View Profile</Link>
                <Link to="/portfolio/edit-profile">Edit Profile</Link>
                <Link to="/">Logout</Link>
              </div>
            </li>
          </div> : */}
          {flag ? 
          <Link to={"/Login"} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Sign In
    <i class="ml-2 fa-solid fa-arrow-right"></i>
    </Link>:
          <button onClick={() => logoutUser()} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Log Out
    <i class="ml-2 fa-solid fa-arrow-right"></i>
    </button>
          }
    </div>
  </div>
</header>
        </>
    )
}

export default Navbar;