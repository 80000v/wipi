import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { Menu, Dropdown, Avatar } from "antd";

export const UserInfo = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    let info = window.sessionStorage.getItem("userInfo");
    try {
      info = JSON.parse(info);
      setUser(info as any);
    } catch (e) {}

    if (!info) {
      Router.replace("/admin/login");
    }
  }, []);

  const menu = () => {
    return (
      <Menu>
        <Menu.Item>
          <Link href="/admin/ownspace">
            <a>个人中心</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/admin/login">
            <a>退出登录</a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <Dropdown overlay={menu}>
      <div
      // style={{
      //   display: "inline-block",
      //   cursor: "pointer",
      //   height: 64,
      //   fontSize: 14
      // }}
      >
        {user && user.avatar ? (
          <Avatar size={"small"} src={user.avatar} />
        ) : (
          <Avatar size={"small"} icon="user" />
        )}
        {user ? <span style={{ marginLeft: 8 }}>Hi, {user.name}</span> : null}
      </div>
    </Dropdown>
  );
};
