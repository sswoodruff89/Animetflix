import {combineReducers} from "redux";
import usersReducer from "./users_reducer";
import programsReducer from "./programs_reducer";
import genresReducer from "./genres_reducer";
import searchReducer from "./search_reducer";
import watchlistsReducer from "./watchlists_reducer";
import likesReducer from "./likes_reducer";
import ProfilesReducer from "./profile_reducer";

export default combineReducers({
    programs: programsReducer,
    genres: genresReducer,
    search: searchReducer,
    users: usersReducer,
    profiles: ProfilesReducer,
    watchlists: watchlistsReducer,
    likes: likesReducer
});
