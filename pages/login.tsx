import styles from "../styles/login.module.sass";
import type { NextPage } from "next";
import { LOGIN_API, REGISTER_API } from "@request/apis";
import { useContext, useState } from "react";
import { login_Status, login_Type, registerAndLoginForm } from "types/types";
import { message } from "antd";
import router from "next/router";
import { MyContext } from "@components/MyContext/MyContext";
import { setLoc } from "@public/index";

const checkForm: (arg0: registerAndLoginForm) => boolean = ({
  account,
  password,
}) => {
  if (!account || !password) {
    !account && message.error("请输入账户");
    !password && message.error("请输入密码");
    return false;
  }
  const checkRex = /^[a-zA-Z0-9]{6,}$/;
  if (!checkRex.test(account) || !checkRex.test(password)) {
    message.error("请输入正确格式的的账号密码");
    return false;
  }

  return true;
};

const Login: NextPage = () => {
  let [account, setaccount] = useState(""); // 账户
  let [password, setpassword] = useState(""); // 密码
  let [confirmPassword, setconfirmPassword] = useState(""); // 确认密码
  let [loginType, setloginType] = useState(login_Type.login); // 登录类型
  const { state, dispatch } = useContext(MyContext) as any;

  const register = async () => {
    if (!checkForm({ account, password })) {
      return;
    }
    await REGISTER_API({
      account,
      password,
    });
    message.success("注册成功");
  };

  const login = async () => {
    if (!checkForm({ account, password })) {
      return;
    }
    let res = await LOGIN_API({
      account,
      password,
    });
    console.log(res.data.token);
    message.success("登录成功");
    dispatch({
      type: "UPDATE_LOGIN_STATUS",
      payload: login_Status.login,
    });
    dispatch({
      type: "UPDATE_USER",
      payload: {
        name: '欢迎',
        img: '/images/Ellipse2.png',
      }
    })
    setLoc("token", res.data.token);
    setTimeout(() => {
      router.push(`/`);
    }, 1000);
  };

  const resetPassword = async () => {
    if (!checkForm({ account, password })) {
      return;
    }
    message.error("暂不支持重置密码");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <h2>
          绿色碳链 ·{" "}
          {loginType === login_Type.login
            ? "账户登录"
            : loginType === login_Type.register
            ? "账户注册"
            : "重置密码"}
        </h2>

        <input
          className="login-input"
          value={account}
          onChange={(e) => {
            setaccount(e.target.value);
          }}
          placeholder="请输入用户名"
          type="text"
        />
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          placeholder="请输入密码"
        />
        {loginType === login_Type.login ? (
          ""
        ) : (
          <input
            className="login-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
            placeholder="请确认密码"
          />
        )}
        {loginType === login_Type.register ? (
          <button onClick={register} className={styles.loginBtn}>
            注册
          </button>
        ) : loginType === login_Type.login ? (
          <button onClick={login} className={styles.loginBtn}>
            登录
          </button>
        ) : (
          <button onClick={resetPassword} className={styles.loginBtn}>
            重置密码
          </button>
        )}
        <div className={styles.checkOutLoginType}>
          <span onClick={() => setloginType(login_Type.resetPassword)}>
            忘记密码？
          </span>
          <span
            onClick={() =>
              setloginType(
                loginType == login_Type.login
                  ? login_Type.register
                  : login_Type.login
              )
            }
          >
            {loginType == login_Type.login ? "账户注册" : "账户登录"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
