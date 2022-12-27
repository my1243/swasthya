import React from "react";

const SignIn = () => {
  return (
    <>
      <div className="max-w-screen min-h-screen flex items-center justify-center">
        <div className="max-w-[1000px] m-auto p-4 border-2 rounded-lg">
          <h1 className="font-bold text-xl uppercase">Sign In</h1>
          <h3 className="text-slate-600 font-semibold mb-4">
            Kindly sign in with your details to get started
          </h3>
          <form className="flex flex-col justify-center">
            <input
              className="max-w-full my-2 p-2 bg-gray-200 rounded-lg placeholder-slate-900"
              type={"text"}
              placeholder="Email Address"
            />
            <input
              className="max-w-full my-2 p-2 bg-gray-200 rounded-lg placeholder-slate-900"
              type={"password"}
              placeholder="Password"
            />
            <a className="max-w-full text-right mb-4 underline" href="#">
              Forgot Password?
            </a>
            <button
              className="bg-zinc-900 text-white p-2 text-xl rounded-lg"
              type={"submit"}
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
