import type { NextPage } from "next";
import styles from "./Header.module.sass";
import { Dropdown, MenuProps, Modal, Space } from "antd";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { MyContext } from "@components/MyContext/MyContext";
import { login_Status } from "types/types";
import Link from "next/link";
import { removeLoc } from "@public/index";

const items: MenuProps["items"] = [
  {
    label: "园区碳总览",
    icon: <img src="/images/Vector-1.png"></img>,
    key: "",
  },
  {
    label: "园区碳足迹",
    icon: <img src="/images/Vector-2.png"></img>,
    key: "parkFootprint",
  },
  {
    label: "企业碳足迹",
    icon: <img src="/images/Vector-3.png"></img>,
    key: "enterpriseFootprint",
  },
  // {
  //   label: "碳活动配置",
  //   icon: <img src="/images/Vector-4.png"></img>,
  //   key: "configuration",
  // },
];
const Header: NextPage = (req, res) => {
  const [current, setCurrent] = useState("parkOverview");
  const [isModalVisible, setisModalVisible] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext) as any;
  const { loginStatus, user } = state;
  const loginOut = () => {
    dispatch({
      type: "UPDATE_LOGIN_STATUS",
      payload: login_Status.notLogin
    })
    removeLoc('token')
    router.push('/login')
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label:
            loginStatus === login_Status.login ? (
              <span onClick={() => setisModalVisible(true)}>退出登录</span>
            ) : (
              <span>
                <Link href={"/login"}>前往登录</Link>
              </span>
            ),
        },
      ]}
    />
  );

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/${e.key}`);
    setCurrent(e.key);
  };
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src="/images/logo.png" alt="" />
        <div className={styles.logoTextBox}>
          <img src="/images/logoText.png" alt="" />
          <span>可信绿色数据服务平台</span>
        </div>
      </div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div>
        <Dropdown overlay={menu}>
          <Space>
            <div>
              <span>{user.name}</span>
              <img className={styles.avatar} src={user.img} alt="" />
              <img className={styles.Vector} src="/images/Vector.png" alt="" />
            </div>
          </Space>
        </Dropdown>
      </div>

      <Modal
        title="提示"
        visible={isModalVisible}
        cancelText="取消"
        okText="确定"
        onCancel={() => setisModalVisible(false)}
        onOk={loginOut}
      >
        <p>确定退出登录吗？</p>
      </Modal>
    </div>
  );
};

export default Header;
