export const getListsStart = () => ({
    type: "GET_LISTS_START",
});

export const getListsSuccess = (lists) => ({
    type: "GET_LISTS_SUCCESS",
    payload: lists
});

export const getListsFailure = () => ({
    type: "GET_LISTS_FAILURE",
});


// export const createMovieStart = () => ({
//     type: "CREATE_MOVIE_START",
// });

// export const createMovieSuccess = (movie) => ({
//     type: "CREATE_MOVIE_SUCCESS",
//     payload: movie
// });

// export const createMovieFailure = () => ({
//     type: "CREATE_MOVIE_FAILURE",
// });


// export const updateMovieStart = () => ({
//     type: "UPDATE_MOVIE_START",
// });

// export const updateMovieSuccess = (movie) => ({
//     type: "UPDATE_MOVIE_SUCCESS",
//     payload: movie
// });

// export const updateMovieFailure = () => ({
//     type: "UPDATE_MOVIE_FAILURE",
// });


export const deleteListStart = () => ({
    type: "DELETE_LIST_START",
});

export const deleteListSuccess = (id) => ({
    type: "DELETE_LIST_SUCCESS",
    payload: id
});

export const deleteListFailure = () => ({
    type: "DELETE_LIST_FAILURE",
});
