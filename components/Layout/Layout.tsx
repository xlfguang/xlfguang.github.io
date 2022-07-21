import Header from "../Header/Header";
import style from "./Layout.module.sass";
import Router, { withRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@components/MyContext/MyContext";
import { login_Status } from "types/types";
import { Modal } from "antd";

const Layout = ({ children, router }: { children: any; router: any }) => {
  const [headerShow, setheaderShow] = useState(false);
  const { state, dispatch } = useContext(MyContext) as any;
  const { loginStatus, user } = state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const goLogin = () => {
    setIsModalVisible(false);
    Router.push("/login");
  };
  const goIndex = ()=>{
    setIsModalVisible(false);
    Router.push("/");
  }
  useEffect(() => {
    router.pathname == "/login" ? setheaderShow(false) : setheaderShow(true);
  }, [router.pathname]);
 
  return (
    <div className={style.box}>
      {headerShow ? <Header /> : <></>}
      <div className={style.contentwrapper}>{children}</div>
      <Modal
        title="提示"
        visible={isModalVisible}
        onCancel={() => goIndex()}
        onOk={() => goLogin()}
        cancelText="取消"
        okText="确定"
      >
        <p>您当前还未登录，请前往登录</p>
      </Modal>
    </div>
  );
};

export default withRouter(Layout);
