import {
  ADD_JOBSITE,
  REMOVE_JOBSITE,
  FILTER_JOBSITES,
  UPDATE_SEARCH_TERM,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_STATUS_COUNTS,
  UPDATE_SELECTED_CATEGORY,
  UPDATE_CATEGORY_ITEMS,
} from "./actionTypes";
import { getStatusCounts } from "../utils/utils";

export const addJobsite =
  (name, status, categories) => (dispatch, getState) => {
    dispatch({
      type: ADD_JOBSITE,
      payload: { name, status, categories },
    });
    dispatch(updateStatusCounts());
  };



export const removeJobsite = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_JOBSITE,
    payload: { id },
  });
  dispatch(updateStatusCounts());
};



export const filterJobsites = (filter) => ({
  type: FILTER_JOBSITES,
  payload: { filter },
});


export const updateSearchTerm = (searchTerm) => ({
  type: UPDATE_SEARCH_TERM,
  payload: { searchTerm },
});


export const addCategory = (jobId, category) => (dispatch, getState) => {
  dispatch({
    type: ADD_CATEGORY,
    payload: { jobId, category },
  });
  dispatch(updateStatusCounts());
};


export const updateCategory =
  (jobId, catId, category) => (dispatch, getState) => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: { jobId, catId, category },
    });
    dispatch(updateStatusCounts());
  };


export const removeCategory = (jobId, catId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CATEGORY,
    payload: { jobId, catId },
  });
  dispatch(updateStatusCounts());
};


export const updateSelectedCategory = (category) => (dispatch, getState) => {
  const state = getState();
  const job = state.jobs.find((job) =>
    job.categories.some((cat) => cat.cat === category.cat)
  );
  const selectedCategory = job.categories.find(
    (cat) => cat.cat === category.cat
  );

  dispatch({
    type: UPDATE_SELECTED_CATEGORY,
    payload: selectedCategory,
  });
};


export const updateCategoryItems = (category, items) => {
  return {
    type: UPDATE_CATEGORY_ITEMS,
    payload: { category, items },
  };
};


export const updateStatusCounts = () => (dispatch, getState) => {
  const state = getState();
  const counts = getStatusCounts(state.jobs);
  dispatch({
    type: UPDATE_STATUS_COUNTS,
    payload: counts,
  });
};
