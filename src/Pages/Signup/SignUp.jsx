import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../ContextProvider/AuthProvider";
import { FaChevronLeft } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.from.pathname;
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signUpByGoogle, signUp, updateUser, removeUser } =
    useContext(AuthContext);
  const getToken = (email) => {
    fetch(`https://mobiledazzar.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.accessToken);
        reset({
          email: "",
          password: "",
          name: "",
          userImg: "",
        });
      })
      .catch((e) => {
        removeUser()
          .then(() => {
            toast.error("something is wrong .Please try again !");
          })
          .catch((e) => console.error(e));
      });
  };
  const addUser = (email, name, img) => {
    let user = {
      email,
      name,
      img,
      friendList: [],
    };

    fetch("https://google-chat-rifat7432.vercel.app/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          getToken(email);
          navigate("/");
        }
      })
      .catch((e) => {
        removeUser()
          .then(() => {
            toast.error("something is wrong .Please try again !");
          })
          .catch((e) => console.error(e));
      });
  };
  const handleSignUp = (data) => {
    const { name, email, password, userImg } = data;
    const image = userImg[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_imgBB_apiKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const img = data.data.url;
          signUp(email, password)
            .then((Result) => {
              console.log(Result.user);
              addUser(email, name, img);
              updateUser(name, img);
            })
            .catch((e) => toast.error(e.message));
        }
      });
  };

  return (
    <div className="hero py-1 ">
      <div className="card w-96 py-5 relative shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
          <h1 className="text-xl text-start">Create an account</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              className="input input-bordered w-full "
              {...register("name", { required: "Enter your name" })}
            />
            {errors?.name && (
              <p className="text-red-500">{errors?.name?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Profile picture</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full "
              {...register("userImg", {
                required: "Enter your Profile picture",
              })}
            />
            {errors?.userImg && (
              <p className="text-red-500">{errors?.userImg?.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">email</span>
            </label>
            <input
              type={"email"}
              className="input input-bordered w-full"
              {...register("email", {
                required: "Enter Your email",
              })}
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={"password"}
              className="input input-bordered w-full "
              {...register("password", { required: "Enter your password" })}
            />
            {errors?.password && (
              <p className="text-red-500">{errors?.password?.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-warning">SignUp</button>
          </div>
        </form>
        <div>
          <label className="ml-5 label">
            <p>
              Already have account
              <Link
                to={"/login"}
                className="label-text-alt link text-lg text-orange-500 link-hover"
              >
                {" "}
                Login
              </Link>
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
