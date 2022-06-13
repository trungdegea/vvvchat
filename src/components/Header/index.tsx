import { SearchOutlined } from "@ant-design/icons";
import { Input, Menu, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { getInfoUser, logoutUser } from "../../services/user.service";
import { LocalhostStorage } from "../../utils/LocalStorage";
import { UserContext } from "../../App";

export const MenuStyled = styled(Menu)`
  .ant-menu-item,
  .ant-menu-submenu {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 18px;
  }
  .ant-menu-item:nth-child(1) {
    margin-right: auto;
  }
`;
export const InputStyled = styled(Input)`
  margin-top: 10px;
  width: 400px;
  .ant-input-group {
    border: 1px solid #d9d9d9;
    border-radius: 14px;
    padding: 4px;
    .ant-input-group-addon,
    input {
      border: none;
      &:focus,
      &:hover {
        border: none;
        box-shadow: 0 0 0 0 #000;
      }
    }
  }
`;
export default function Header() {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/courses/search/${search}`);
  };
  useEffect(() => {
    void (async () => {
      try {
        const id = LocalhostStorage.get("id");
        const res = await getInfoUser(id);
        console.log(res);
        setUser(res?.data?.user);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const logoutAsync = async () => {
    try {
      const res = await logoutUser();
      setUser({ id: "", name: "", username: "" });
      LocalhostStorage.clear();
    } catch (error) {}
  };
  const handleNavigate = (key: string) => {
    switch (key) {
      case "item-1":
        navigate("/");
        break;
      case "item-2":
        navigate("/chat");
        break;
      case "item-3":
        navigate("/login");
        break;
      case "item-4":
        navigate("/register");
        break;
      case "item-6":
        logoutAsync();
        navigate("/");
        break;
      default:
        break;
    }
  };
  const items = user?.id
    ? [
        {
          label: (
            <>
              <img
                src="https://www.kindpng.com/picc/m/241-2417218_transparent-familia-clipart-centralized-system-logo-png-png.png"
                width={80}
                height={80}
                style={{ marginRight: 5 }}
              />
            </>
          ),
          key: "item-0",
        },
        { label: "HOME", key: "item-1" },
        { label: "CHAT", key: "item-2" },
        { label: user?.name, key: "item-5" },
        { label: "LOGOUT", key: "item-6" },
      ]
    : [
        {
          label: (
            <>
              <img
                src="https://www.kindpng.com/picc/m/241-2417218_transparent-familia-clipart-centralized-system-logo-png-png.png"
                width={80}
                height={80}
                style={{ marginRight: 5 }}
              />
            </>
          ),
          key: "item-0",
        },
        { label: "HOME", key: "item-1" },
        { label: "CHAT", key: "item-2" },
        { label: "LOGIN", key: "item-3" },
        { label: "REGISTER", key: "item-4" },
      ];
  return (
    <>
      <MenuStyled
        items={items}
        mode="horizontal"
        onClick={(e) => handleNavigate(e.key)}
      />
    </>
  );
}
