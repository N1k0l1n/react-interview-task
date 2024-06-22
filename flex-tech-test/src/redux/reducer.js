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

const initialState = {
  jobs: [],
  filter: "ALL",
  searchTerm: "",
  statusCounts: { onRoad: 0, completed: 0, onHold: 0 },
  selectedCategory: null,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_JOBSITE:
      return {
        ...state,
        jobs: [
          ...state.jobs,
          {
            name: action.payload.name,
            status: action.payload.status,
            categories: action.payload.categories,
            completed: false,
          },
        ],
      };



    case REMOVE_JOBSITE:
      return {
        ...state,
        jobs: state.jobs.filter((job, index) => index !== action.payload.id),
      };


    case FILTER_JOBSITES:
      return {
        ...state,
        filter: action.payload.filter,
      };


    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };


    case ADD_CATEGORY:
      return {
        ...state,
        jobs: state.jobs.map((job, index) =>
          index === action.payload.jobId
            ? {
                ...job,
                categories: [...job.categories, action.payload.category],
              }
            : job
        ),
      };


    case UPDATE_CATEGORY:
      return {
        ...state,
        jobs: state.jobs.map((job, index) =>
          index === action.payload.jobId
            ? {
                ...job,
                categories: job.categories.map((category, catIndex) =>
                  catIndex === action.payload.catId
                    ? { ...category, ...action.payload.category }
                    : category
                ),
              }
            : job
        ),
      };


    case REMOVE_CATEGORY:
      return {
        ...state,
        jobs: state.jobs.map((job, index) =>
          index === action.payload.jobId
            ? {
                ...job,
                categories: job.categories.filter(
                  (_, catIndex) => catIndex !== action.payload.catId
                ),
              }
            : job
        ),
      };


    case UPDATE_STATUS_COUNTS:
      return {
        ...state,
        statusCounts: action.payload,
      };

    case UPDATE_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };



    case UPDATE_CATEGORY_ITEMS:
      const updatedJobs = state.jobs.map((job) => {
        if (job.categories.some((cat) => cat.cat === action.payload.category)) {
          return {
            ...job,
            categories: job.categories.map((cat) =>
              cat.cat === action.payload.category
                ? { ...cat, items: action.payload.items }
                : cat
            ),
          };
        }
        return job;
      });

      return {
        ...state,
        jobs: updatedJobs,
        selectedCategory: {
          ...state.selectedCategory,
          items: action.payload.items,
        },
      };
      

    default:
      return state;
  }
};

export default jobsReducer;
