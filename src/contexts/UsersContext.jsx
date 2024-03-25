import { createContext, useReducer, useState, useEffect } from "react";

const UsersContext = createContext();

export const UsersActionTypes = {
  getAll: 'fetch all data',
  addNew: 'adds new user',
  changeData: 'change one piece of user data'
}

const reducer = (state, action) => {
  switch(action.type){
    case UsersActionTypes.getAll:
      return action.data;
    case UsersActionTypes.addNew:
      fetch(`http://localhost:8080/users`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case UsersActionTypes.changeData:
      fetch(`http://localhost:8080/users/${action.id}`,{
        method: "PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return state.map(el => {
        if(el.id === action.id){
          return {
            ...el,
            ...action.data
          }
        } else {
          return el;
        }
      })
    default:
      return state;
  }
}

const UsersProvider = ({ children }) => {

  const [loggedInUser, setLoggedInUser] = useState(false);
  const [users, setUsers] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then(data => setUsers({
        type: UsersActionTypes.getAll,
        data: data
      }))
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        loggedInUser,
        setLoggedInUser
      }}
    >
      { children }
    </UsersContext.Provider>
  )
}

export { UsersProvider }
export default UsersContext;