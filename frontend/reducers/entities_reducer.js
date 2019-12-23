import {combineReducers} from "redux";
import usersReducer from "./users_reducer";
import moviesReducer from "./movies_reducer";
import genresReducer from "./genres_reducer";
import searchReducer from "./search_reducer";
import watchlistsReducer from "./watchlists_reducer";
import ProfilesReducer from "./profile_reducer";

export default combineReducers({
    movies: moviesReducer,
    genres: genresReducer,
    search: searchReducer,
    users: usersReducer,
    profiles: ProfilesReducer,
    watchlists: watchlistsReducer
});
