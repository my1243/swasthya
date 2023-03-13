import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Landing/>
      <Available />
      <Footer/>
    </>
  );
};

const Landing = () => {
  return(
    <>
        <div className="flex justify-center items-center">
            <div className="flex-1 basis-1/2">
                <h1>👉🏻 Welcome to Swasthya</h1>
                <h1>For private clinics and medical centers</h1>
                <p>Good health is a state of mental, physical and social well being and it does not just mean the absence of disease!</p>
                <div>
                    <button>Get in Touch <i class="fa-solid fa-chevron-right"></i></button>
                    <h4>See More <i class="fa-solid fa-arrow-right"></i></h4>
                </div>
            </div>
            <div className="flex-1 basis-1/2"></div>
        </div>
    </>
  )
};

const Available = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="flex-1 basis-1/2 p-20 order-2 lg:order-1">
          <h1 className="text-7xl font-bold mb-8">
            Available on <span className="text-blue-800">Android & IOS</span>
          </h1>
          <p className="text-slate-700 leading-6 mb-16 text-sm font-medium">
            We provide a mobile version (Android & IOS) as a complementary
            system. Book Appointment to make it easier for users to use this
            system when outside the hospital or when not bringing a laptop. In
            this mobile version it is exaactly what is on the web system so
            don't worry about using it.
          </p>
          <div className="flex gap-x-12">
            <button className="flex w-52 items-center py-2 px-4 bg-black text-white rounded-xl gap-x-4">
              <div>
                <i class="text-5xl fa-brands fa-apple"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-200 font-medium text-left">
                  Available on
                </h3>
                <h3 className="tracking-wider font-semibold text-xl text-left">App Store</h3>
              </div>
            </button>
            <button className="flex w-52 items-center px-4 py-2 bg-black text-white rounded-xl gap-x-4">
              <div>
                <i class="text-4xl fa-brands fa-google-play"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-200 font-medium text-left">
                  Available on
                </h3>
                <h3 className="tracking-wider font-semibold text-xl text-left">Play Store</h3>
              </div>
            </button>
          </div>
        </div>
        <div className="basis-1/2 flex-1 order-1 lg:order-2">
          <img src="./images/land.png" />
        </div>
      </div>
    </>
  );
};

const Footer = () => {
    return(
        <>
            <div className="flex flex-col items-center gap-y-6 my-6 bg-gray-50">
                <div className="flex gap-x-4 md:gap-x-12 font-medium text-slate-700 justify-center">
                    <Link className="hover:text-slate-900 hover:scale-110 transistion-all duration-300">Home</Link>
                    <Link className="hover:text-slate-900 hover:scale-110 transistion-all duration-300">About</Link>
                    <Link className="hover:text-slate-900 hover:scale-110 transistion-all duration-300">Services</Link>
                    <Link className="hover:text-slate-900 hover:scale-110 transistion-all duration-300">Contact</Link>
                    <Link className="hover:text-slate-900 hover:scale-110 transistion-all duration-300 hidden sm:block">Join Us</Link>
                </div>
                <div className="flex gap-x-6 md:gap-x-12 text-xl text-slate-700 cursor-pointer">
                <i class="fa-brands fa-facebook hover:text-slate-900 hover:scale-125 transition-all duration-300"></i>
                <i class="fa-brands fa-instagram hover:text-slate-900 hover:scale-125 transition-all duration-300"></i>
                <i class="fa-brands fa-twitter hover:text-slate-900 hover:scale-125 transition-all duration-300"></i>
                <i class="fa-brands fa-github hover:text-slate-900 hover:scale-125 transition-all duration-300"></i>
                <i class="fa-brands fa-youtube hover:text-slate-900 hover:scale-125 transition-all duration-300"></i>
                </div>
                <div className="text-sm text-slate-700">&#169; 2022 Swasthya Pvt. Ltd. All rights reserved.</div>
            </div>
        </>
    )
}

export default Home;
