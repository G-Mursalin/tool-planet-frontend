// React
import React from "react";
// React Firebase Hook
import auth from "../Firebase/firebase.init";
import { useForm } from "react-hook-form";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
// React Router
import { Link, useLocation, useNavigate } from "react-router-dom";
// Components
import Loading from "../../Utilities/Loading";
import useToken from "../../UseHook/useToken";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let showSignInError = "";
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [token] = useToken(user || gUser);

  if (error || gError) {
    showSignInError = (
      <p className="text-red-500 mb-2 text-sm">
        {error?.message || gError?.message}
      </p>
    );
  }
  if (gLoading || loading) {
    return <Loading />;
  }
  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };
  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div className="flex h-screen justify-center items-center px-16">
      <div className="card w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email(admin@gmail.com)</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full focus:border-primary focus:outline-none"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password(123456)</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full focus:border-primary focus:outline-none"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 character or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {showSignInError}
            <input
              type="submit"
              value="LOGIN"
              className="btn text-white bg-primary border-0 py-2 px-6 w-full focus:outline-none cursor-pointer rounded-lg text-lg"
            />
            <p className="mt-3 text-center">
              New to Doctors Portal?&nbsp;
              <Link to="/signup" className="text-primary">
                Creat New Account
              </Link>
            </p>
          </form>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="divider">OR</div>
          </div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline btn-primary uppercase"
          >
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
