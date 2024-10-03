import axios from "axios";
import {
  getAllCompanyFail,
  getAllCompanySuccess,
  loadingStart,
  btnLoadingStart,
  addCompanySuccess,
  addCompanyFail,
  getSingleCompanySuccess,
  getSingleCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "../reducer/comapnyReducer";
import Cookies from "js-cookie";

export const getAllCompany = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get(
      "/api/company/all?token=" + Cookies.get("token")
    );

    dispatch(getAllCompanySuccess(data));
  } catch (error) {
    dispatch(getAllCompanyFail(error.response.data.message));
  }
};

export const addCompany = (formdata, clearData) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/company/new?token=" + Cookies.get("token"),
      formdata
    );

    dispatch(addCompanySuccess(data));
    dispatch(getAllCompany());
    clearData();
  } catch (error) {
    dispatch(addCompanyFail(error.response.data.message));
  }
};

export const getSingleCompany = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get(
      "/api/company/single?token=" + Cookies.get("token") + "&id=" + id
    );

    dispatch(getSingleCompanySuccess(data));
  } catch (error) {
    dispatch(getSingleCompanyFail(error.response.data.message));
  }
};
export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.delete(
      "/api/company/delete?token=" + Cookies.get("token") + "&id=" + id
    );

    dispatch(deleteCompanySuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(deleteCompanyFail(error.response.data.message));
  }
};
