import type { NextPage } from "next";
import styles from "./Header.module.sass";
import { Dropdown, MenuProps, Modal, Space } from "antd";
import { Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MyContext } from "@components/MyContext/MyContext";
import { login_Status } from "types/types";
import Link from "next/link";
import { removeLoc } from "@public/index";
import { GET_ALL_PARK_LIST_API } from "@request/apis";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const items: MenuProps["items"] = [
  {
    label: "园区碳总览",
    icon: <img src="/images/Vector-1.png"></img>,
    key: "/",
  },
  {
    label: "园区碳足迹",
    icon: <img src="/images/Vector-2.png"></img>,
    key: "/parkFootprint",
  },
  {
    label: "企业碳足迹",
    icon: <img src="/images/Vector-3.png"></img>,
    key: "/enterpriseFootprint",
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
  let [parkList, setParkList] = useState<ItemType[]>([
    {
      key: "0",
      label:
        loginStatus === login_Status.login ? (
          <span onClick={() => setisModalVisible(true)}>退出登录</span>
        ) : (
          <span>
            <Link href={"/login"}>前往登录</Link>
          </span>
        ),
    },
  ]);
  const menu = <Menu items={parkList} />;

  const loginOut = () => {
    dispatch({
      type: "UPDATE_LOGIN_STATUS",
      payload: login_Status.notLogin,
    });
    removeLoc("token");
    router.push("/login");
  };
  useEffect(() => {
    if (loginStatus === login_Status.login) {
      getAllParkList();
    }
  }, [loginStatus]);

  useEffect(() => {
    setCurrent(router.pathname);
  });
  const setpark = (id: number, name: string) => {
    dispatch({
      type: "UPDATE_PARK_ID",
      payload: id,
    });
    dispatch({
      type: "UPDATE_USER",
      payload: {
        name: name,
        img: "/images/Ellipse2.png",
      },
    });
  };

  const setParkId = (parkId: number, name: string) => {
    setpark(parkId, name);
    router.push(`/parkFootprint`);
  };

  const getAllParkList = async () => {
    let res = await GET_ALL_PARK_LIST_API();
    let parkList = res.data.map((item) => {
      return {
        key: item.id,
        label: (
          <span onClick={() => setParkId(item.id, item.name)}>{item.name}</span>
        ),
      };
    });
    setpark(res.data[0].id, res.data[0].name);
    setParkList([...parkList]);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`${e.key}`);
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
