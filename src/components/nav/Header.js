import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import { useTranslation } from "react-i18next";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { t } = useTranslation();
  
  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));
  
  let history = useHistory();
  
  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };
  
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <>
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={{display: "block"}}>

      <SubMenu title="Lang">
        <Menu.Item onClick={() => changeLang("en")}>En (English)</Menu.Item>
        <Menu.Item onClick={() => changeLang("es")}>Es (Spanish)</Menu.Item>
      </SubMenu>

      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">{t("3Home")}</Link>
      </Item>

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">{t("1Shop")}</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            {t('2Cart')}
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">{t("4Register")}</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">{t("5Login")}</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">{t("6Dashboard")}</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">{t("6Dashboard")}</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            {t("7Logout")}
          </Item>
        </SubMenu>
      )}

      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
    </>
 );
};

export default Header;


const changeLang = (lang) => {
  localStorage.setItem('lang', lang)
  window.location.reload()
}