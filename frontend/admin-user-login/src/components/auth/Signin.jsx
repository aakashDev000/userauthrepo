import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signinrequest } from "../service/action";

const Signin = () => {
  const [adminDetails, setAdminDetails] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const {
      target: { name, value },
    } = e;
    setAdminDetails({ ...adminDetails, [name]: value });
  };

  const goto = useNavigate();

  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    if (token) {
      goto("/home");
    }
  }, [goto, token]);

  const signin = () => {
    const { email, password } = adminDetails;
    if (!email) {
      toast.error("Please Enter the email");
    }
    if (email && !password) {
      toast.error("Please Enter the password");
    }

    if (email && password) {
      signinrequest({ data: adminDetails })
        .then((res) => {
          goto("/home");
        })
        .catch((err) => {
          console.log("err", err);
          const { data = {} } = err;
          const { data: message = "Error occured" } = data;
          if (message) toast.error(message);
        });
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Do You have an user account?{" "}
        {/* <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a> */}
        <Link
          to={`/usersignin`}
          className="font-medium text-purple-600 hover:underline"
        >
          User Signin
        </Link>
      </p>
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Signin
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label
              // for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={adminDetails.email}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              // for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={adminDetails.password}
              onChange={onChangeHandler}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a> */}
          <div className="mt-6">
            <button
              onClick={signin}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              signin
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <Link
            to={`/signup`}
            className="font-medium text-purple-600 hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
