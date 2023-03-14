import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const [user,setUser] = useState({});
    const [flag,setFlag] = useState(false);

    
    const logoutUser = async () => {
        const res = await fetch('/logout',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json"
            }
        })
        if(res.status === 200) {
            props.setDoct({});
            window.location = "/";
        }
    }

    return(
        <>
            <header class="text-gray-600 body-font py-2 sticky top-0 bg-white">
  <div class="container mx-auto flex px-5 flex-col md:flex-row justify-between items-center">
  <div>
    <Link to={"/"} class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span class="ml-3 text-xl">Swasthya 24/7</span>
    </Link>
    </div>
    <div className="flex flex-row items-center gap-x-8 font-medium text-md">
        <a href="../#home" className="hover:text-sky-400 hover:scale-110 transistion-all duration-300">Home</a>
        <a href="../#about" className="hover:text-sky-400 hover:scale-110 transistion-all duration-300">About</a>
        <a href="../#service" className="hover:text-sky-400 hover:scale-110 transistion-all duration-300">Services</a>
        <a href="" className="hover:text-sky-400 hover:scale-110 transistion-all duration-300">Contact</a>
    { Object.keys(props.doct).length > 0 ? 
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
                <Link to="/user-search">Dashboard</Link>
                <Link to="/" onClick={logoutUser}>Logout</Link>
              </div>
            </li>
          </div> :
          
          <Link to={"/login"} class="inline-flex items-center bg-sky-400 border-0 py-1 px-3 focus:outline-none hover:bg-sky-500 text-white hover:scale-110 transisiton-all duration-300 rounded-full text-base mt-4 md:mt-0">Log In
    <i class="ml-2 fa-solid fa-arrow-right"></i>
    </Link>
          }
    </div>
  </div>
</header>
        </>
    )
}

export default Navbar;