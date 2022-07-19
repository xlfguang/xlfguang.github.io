import Header from "../Header/Header";
import style from "./Layout.module.sass";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: any }) => {
  const router = useRouter();
  const [headerShow, setheaderShow] = useState(true);
  useEffect(() => {
    router.pathname == "/login" ? setheaderShow(false) : setheaderShow(true);
  });
  return (
    <div className={style.box}>
      {/* <Header /> */}
      {headerShow ? <Header /> : <></>}
      <div className={style.contentwrapper}>{children}</div>
    </div>
  );
};

export default Layout;
