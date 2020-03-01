///Checks for like, dislike, and watchlist/////
export const checkLikeDislikeWatchlist = (program, state) => {

    let watched =
      program.id && state.entities.watchlists[program.id]
        ? state.entities.watchlists[program.id]
        : null;

    let liked =
      program.id && state.entities.likes[program.id]
        ? state.entities.likes[program.id]
        : null;

    let disliked =
      program.id && state.entities.dislikes[program.id]
        ? state.entities.dislikes[program.id]
        : null;

    return { watched, liked, disliked };
}