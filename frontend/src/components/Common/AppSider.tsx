import React from 'react';
import { Layout, Menu, type MenuProps } from 'antd';
import Menuconfig from "../../config";
import * as Icons from '@ant-design/icons';

const { Sider } = Layout;

type MenuConfigItem = {
  path: string;
  label: string;
  icon?: keyof typeof Icons;
  children?: MenuConfigItem[];
};


//动态获取icon
const iconToElement = (name: keyof typeof Icons) => {
  const IconComponent = Icons[name] as React.ComponentType<any>;
  return IconComponent ? <IconComponent /> : null;
}

const buildMenuItems = (items: MenuConfigItem[]): MenuProps['items'] => {
  return items.map((item) => ({
    key: item.path,
    icon: item.icon ? iconToElement(item.icon) : undefined,
    label: item.label,
    children: item.children ? buildMenuItems(item.children) : undefined,
  }));
};

const menuItems = buildMenuItems(Menuconfig as MenuConfigItem[]);

interface AppSiderProps {
  collapsed: boolean;
}

const AppSider: React.FC<AppSiderProps> = ({ collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className={`sidebar-title ${collapsed ? 'collapsed' : ''}`}>
        {collapsed ? '通用' : '通用后台管理系统'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSider;