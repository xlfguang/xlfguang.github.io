import { getLoc } from "@public/index";
import router from "next/router";
import React, { createContext, useEffect, useReducer } from "react";
import { login_Status } from "../../types/types";
const initialState = {
  loginStatus: login_Status.notLogin,
  user: {
    name: "尚未登录",
    img: "/images/Ellipse2.png",
  },
  parkId: 0,
  typeId: 0,
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
    case "UPDATE_PARK_ID":
      return {
        ...state,
        parkId: payload,
      };
    case "UPDATE_TYPE_ID":
      return {
        ...state,
        typeId: payload,
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
  const {loginStatus} = state;
  useEffect(() => {
    const token = getLoc("token");
    if (token) {
      dispatch({
        type: "UPDATE_LOGIN_STATUS",
        payload: login_Status.login,
      });
      dispatch({
        type: "UPDATE_USER",
        payload: {
          name: "欢迎",
          img: "/images/Ellipse2.png",
        },
      });
    }
    console.log('XXX');
  }, []);
  

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
export default MyContextWrapper;
