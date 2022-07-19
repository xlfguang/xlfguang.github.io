import Header from "../Header/Header";
import style from "./Layout.module.sass";
import { Router, withRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@components/MyContext/MyContext";
import { login_Status } from "types/types";

const Layout = ({ children, router }: { children: any; router: Router }) => {
  const [headerShow, setheaderShow] = useState(true);
  const { state, dispatch } = useContext(MyContext) as any;
  const { loginStatus, user } = state;
  useEffect(() => {
    router.pathname == "/login" ? setheaderShow(false) : setheaderShow(true);
    if (loginStatus !== login_Status.login && router.pathname !== "/login") {
      router.push("/login");
    }
  });
  return (
    <div className={style.box}>
      {headerShow ? <Header /> : <></>}
      <div className={style.contentwrapper}>{children}</div>
    </div>
  );
};

export default withRouter(Layout);
