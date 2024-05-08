export const handleErrorUnAuthReq = (error, navigate, location) => {
  const status = error?.reponse?.status;
  if (status === 401 || status === 403) {
    console.log("you need to log in");
    navigate("/login", {state: })
  }
};
