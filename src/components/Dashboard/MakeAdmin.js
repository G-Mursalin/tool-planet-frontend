// React
import React, { useState, useEffect } from "react";
// Firebase Hook
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../Authentication/Firebase/firebase.init";
import { signOut } from "firebase/auth";
// React Query
import { useQuery } from "react-query";
// React Route
import { useNavigate } from "react-router-dom";
// React Toast
import { toast } from "react-toastify";
// Components
import Loading from "./../Utilities/Loading";

const MakeAdmin = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(" https://tool-planet.onrender.com/users", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
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
  //   Make Admin
  const makeAdmin = (email) => {
    fetch(` https://tool-planet.onrender.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
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
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Make Admin Successfully");
        }
      });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <h2 className="text-2xl mb-3">Make Admin {users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.email}</td>
                <td>
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => makeAdmin(user.email)}
                      className="btn btn-xs"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <p className="font-bold">Admin</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MakeAdmin;
