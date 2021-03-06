import { getLoc } from "@public/index";
import React, { createContext, useEffect, useReducer } from "react";
import { login_Status } from "../../types/types";

const initialState = {
  loginStatus: login_Status.notLogin,
  user: {
    name: "尚未登录",
    img: "/images/Ellipse2.png",
  },
  parkFootprint: {
    id: 0,
    activityId: 0,
  },
};

// 编写我们的 reducer，写法和 redux 的完全相同
function reducer(state = initialState, action: any) {
  const { type, payload } = action || {};
  switch (type) {
    case "UPDATE_LOGIN_STATUS":
      return {
        ...state,
        loginStatus: payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: payload,
      };
    case "UPDATE_PARK_FOOTPRINT":
      return {
        ...state,
        parkFootprint: payload,
      };
    default:
      return state;
  }
}

// 生成 state 以及 dispatch
export const MyContext = createContext({});

// 将 wrapper 暴露出去
const MyContextWrapper = ({ children: children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const token = getLoc("token");
    if (token) {
      dispatch({
        type: "UPDATE_LOGIN_STATUS",
        payload: login_Status.login,
      });
    }
  }, []);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContextWrapper;
