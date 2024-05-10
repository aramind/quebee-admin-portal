import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const EMPLOYEE_URL = constants?.API_URL?.EMPLOYEE;

const useEmployeeReq = () => {
  const request = useRequest();

  const employeeReq = {};
  return employeeReq;
};

export default useEmployeeReq;
