// React
import React from "react";
// Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Authentication/Firebase/firebase.init";
import { signOut } from "firebase/auth";
// React  Router
import { useNavigate } from "react-router-dom";
// React tostify
import { toast } from "react-toastify";
// React Query
import { useQuery } from "react-query";
// Components
import Loading from "../Utilities/Loading";

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const {
    data: userProfileInfo,
    isLoading,
    refetch,
  } = useQuery(["userProfile", user.email], () =>
    fetch(
      ` https://tool-planet.onrender.com/userprofile?userEmail=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("accessToken");
        signOut(auth);
        navigate("/un-authorize-access");
      }
      if (res.status === 403) {
        localStorage.removeItem("accessToken");
        signOut(auth);
        navigate("/forbidden-access");
      }
      return res.json();
    })
  );
  console.log();
  const handleUserInfo = (e) => {
    e.preventDefault();

    const userInfo = {
      userName: user.displayName,
      userEmail: user.email,
      education: e.target.education.value,
      location: e.target.location.value,
      phone: e.target.phone.value,
    };
    // Send data to server
    fetch(" https://tool-planet.onrender.com/userprofile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.info);
          refetch();
        }
      });
    e.target.reset();
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div>
        <h2 className="text-2xl mb-3">My Profile</h2>
        <p className="font-bold">User Name: {user.displayName}</p>
        <p className="font-bold">User Email: {user.email}</p>
        <p className="font-bold">
          Education:
          {userProfileInfo.userInfo
            ? userProfileInfo.userInfoExist.education
            : "Not Added"}
        </p>
        <p className="font-bold">
          Location:
          {userProfileInfo.userInfo
            ? userProfileInfo.userInfoExist.location
            : "Not Added"}
        </p>
        <p className="font-bold">
          Phone Number:{" "}
          {userProfileInfo.userInfo
            ? userProfileInfo.userInfoExist.phone
            : "Not Added"}
        </p>
        <p className="font-bold">LinkedIn profile link: </p>
      </div>
      <div className="text-gray-600 body-font relative">
        <div className="container px-5">
          <div className="flex flex-col text-center w-full mb-12">
            <p className="lg:w-2/3 mx-auto leading-relaxed text-lg font-bold">
              Add others information:
            </p>
          </div>
          <form onSubmit={handleUserInfo} className="w-full  mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 md:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.displayName}
                    readOnly
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 md:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    User Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={user.email}
                    readOnly
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 md:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="education"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 md:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="location"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 md:w-1/2 w-full">
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Save Info./Update Info.
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
