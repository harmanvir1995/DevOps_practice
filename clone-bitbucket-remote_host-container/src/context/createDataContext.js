import React, { useReducer } from "react";

/**
 * create a context and a component which is the provider's context,
 * this component needs the provider's children
 * @param {*} reducer 
 * @param {*} actions : the context's functions
 * @param {*} initialState : the initial state of the created context
 * @returns a context and a provider component 
 */
const createDataContext = (reducer, actions, initialState) => {
  const Context = React.createContext();

  /**
   * @param {*} children
   * @returns the context's provider
   */
  const Provider = ({ children, value }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions, ...value }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
