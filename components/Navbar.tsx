"use client";

import { useAppSelector } from "@/redux/hook";
import { ShoppingCartOutlined, SunOutlined } from "@ant-design/icons";
import { Badge, Button, Popover } from "antd";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import Cart from "./Cart";

const Navbar = () => {
  const { products } = useAppSelector((state) => state.cart);
  const { theme, setTheme } = useTheme();

  const darkMode = useMemo(() => theme === "dark", [theme]);

  const productCount = useMemo(() => products?.length || 0, [products]);

  return (
    <div className="shadow-sm">
      <div className="relative container flex flex-row justify-between items-center mx-auto py-3">
        <h2>NVP Marketplace</h2>
        <div className="flex flex-row items-center gap-x-4">
          <Popover placement="bottomRight" content={<Cart />}>
            <Badge count={productCount}>
              <Button icon={<ShoppingCartOutlined />} />
            </Badge>
          </Popover>
          <Button
            icon={<SunOutlined />}
            onClick={() => setTheme(darkMode ? "light" : "dark")}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
