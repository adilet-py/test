const SET_FAVORITE = 'SET_FAVORITE';
const SET_UNFAVORITE = 'SET_UNFAVORITE';
const SET_USERS = 'SET_USERS';
const SORT = 'SORT'

let initialState = {
  users: [],
  sorted: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE: {
      return {
        ...state,
        users: state.users.map(u => {
          if(u.id === action.userId) {
            return {...u, favorite: true}
          }
          return u;
        })
      }
    }
    case SET_UNFAVORITE: {
      return {
        ...state,
        users: state.users.map(u => {
          if(u.id === action.userId) {
            return {...u, favorite: false}
          }
          return u;
        })
      }
    }
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SORT: {
      return { ...state, sorted: !state.sorted}
    }
    default:
      return state;
  }
};

export const favoriteAC = userId => ({ type: SET_FAVORITE, userId});
export const unfavoriteAC = userId => ({ type: SET_UNFAVORITE, userId});
export const setUsersAC = users => ({ type: SET_USERS, users });
export const sortAC = () => ({ type: SORT });

export default userReducer;
