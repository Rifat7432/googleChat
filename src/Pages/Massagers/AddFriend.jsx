import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextProvider/AuthProvider";

const AddFriend = () => {
  const navigate = useNavigate();
  const { login, user, logOut } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleLogin = (data) => {
    const { email } = data;
    console.log(email);
    console.log(user?.email);
    fetch(`http://localhost:5555/searchUser/${user?.email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        if(data.data === "unable"){
          toast.error("This account dose not exist");
          reset({
            email: "",
          });
        
        }
        if (data.data === "undefined") {
          fetch(`http://localhost:5555/user/${user?.email}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email }),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success(" added to friend list");
              navigate("/chat");
              reset({
                email: "",
              });
            })
        }
        if (data.data === "found") {
          toast.success("already added to friend list");
          reset({
            email: "",
          });
        }
      });
   
  };
  return (
    <div>
      <div className="card w-96 mx-auto relative mt-16 py-5 shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <h1 className="text-4xl font-bold text-center">
            Please Enter your friend email
          </h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type={"email"}
              className="input input-bordered w-full "
              {...register("email", { required: "Enter your email" })}
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-warning">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriend;
