const checkMatch = (str, query) => {
  return str.toLowerCase().startsWith(query);
};

const XORCompare = (a, b) => {
  return (a || b) && !(a && b);
};


// export const sortBySearch = (obj, query) => {

//   return obj.sort((a,b) => {
//     if (XORCompare(checkMatch(a.title, query), checkMatch(b.title, query))) {
//       return (checkMatch(a.title, query)) ? -1 : 1;
//     } else if (XORCompare(checkMatch(a.director, query), checkMatch(b.director, query))) {
//       return (checkMatch(a.director, query)) ?
//         -1 : 1;
//     } else {
//       return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0;
//     }
//   });

// };

export const sortBySearch = (state, arr, query) => {
  let sortArr = arr.slice(0);
  return sortArr.sort((a, b) => {
    if (XORCompare(checkMatch(state[a].title, query), checkMatch(state[b].title, query))) {
      return (checkMatch(state[a].title, query)) ? -1 : 1;
    } else if (XORCompare(checkMatch(state[a].director, query), checkMatch(state[b].director, query))) {
      return (checkMatch(state[a].director, query)) ?
        -1 : 1;
    } else {
      return (state[a].title < state[b].title) ? -1 : (state[a].title > state[b].title) ? 1 : 0;
    }
  });

};

export const sortByScore = (obj) => {
  return obj.sort((a,b) => {
    return (a.score < b.score) ? 1 : (a.score > b.score) ? -1 : 0;
  });
};

export const sortByListLength = (obj) => {
  return obj.sort((a, b) => {
    return (a.program_ids.length < b.program_ids.length) ? 1 : (a.program_ids.length > b.program_ids.length) ? -1 : 0;
  });
};

export const sortByViewerPoints = (obj) => {
  return obj.sort((a, b) => {
    return (a.viewer_points < b.viewer_points) ? 1 : (a.viewer_points > b.viewer_points) ? -1 : 0;
  });
};

export const sortByDateAdded =  (obj) => {
  return obj.sort((a, b) => {
    return (a.created_at < b.created_at) ? 1 : (a.created_at > b.created_at) ? -1 : 0;
  });
};