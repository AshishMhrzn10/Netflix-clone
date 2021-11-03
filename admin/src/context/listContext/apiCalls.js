import axios from "axios";
import {
    getListsStart,
    getListsSuccess,
    getListsFailure,
    deleteListStart,
    deleteListSuccess,
    deleteListFailure,
    createListStart,
    createListSuccess,
    createListFailure
} from "./ListActions";

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get("/lists",
            {
                headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken }
            });
        dispatch(getListsSuccess(res.data));
    }
    catch (err) {
        dispatch(getListsFailure());
    }
};

//CREATE
export const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post("/lists", list,
            {
                headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken }
            });
        dispatch(createListSuccess(res.data));
    }
    catch (err) {
        dispatch(createListFailure());
    }
};

//DELETE
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/lists/" + id,
            {
                headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken }
            });
        dispatch(deleteListSuccess(id));
    }
    catch (err) {
        dispatch(deleteListFailure());
    }
};