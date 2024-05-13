import React from "react";
import LoadingPage from "../../pages/LoadingPage";

const useDisplayLoadingPage = () => {
  const displayLoadingPage = () => {
    return <LoadingPage />;
  };

  return displayLoadingPage;
};

export default useDisplayLoadingPage;
