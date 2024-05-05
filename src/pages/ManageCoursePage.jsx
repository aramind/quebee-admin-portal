import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const ManageCoursePage = () => {
  const { auth } = useContext(AuthContext);

  console.log("FROM MANAGECOURSE", auth);

  return (
    <div>
      ManageCoursePage
      {auth && Object.values(auth).map((value) => <p>{value.toString()}</p>)}
    </div>
  );
};

export default ManageCoursePage;
