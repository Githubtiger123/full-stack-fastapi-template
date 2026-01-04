export default [
    {
      path: '/home',
      name: 'home',
      label: '首页',
      icon: 'HomeOutlined',
      url: '/home/index'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      label: '仪表盘',
      icon: 'DashboardOutlined',
      url: '/dashboard/index'
    },
    {
      path: '/order',
      name: 'order',
      label: '订单管理',
      icon: 'ShoppingCartOutlined',
      url: '/order/index'
    },
    {
      path: '/system',
      label: '系统管理',
      icon: 'SettingOutlined',
      children: [
        {
          path: '/system/user',
          name: 'systemUser',
          label: '用户管理',
          icon: 'UserOutlined'
        },
        {
          path: '/system/role',
          name: 'systemRole',
          label: '角色管理',
          icon: 'TeamOutlined'
        },
        {
          path: '/system/menu',
          name: 'systemMenu',
          label: '菜单管理',
          icon: 'MenuOutlined'
        }
      ]
    },
    {
      path: '/report',
      label: '统计分析',
      icon: 'BarChartOutlined',
      children: [
        {
          path: '/report/sales',
          name: 'salesReport',
          label: '销售报表',
          icon: 'LineChartOutlined'
        },
        {
          path: '/report/user',
          name: 'userReport',
          label: '用户统计',
          icon: 'PieChartOutlined'
        }
      ]
    },
    {
      path: '/finance',
      name: 'finance',
      label: '财务管理',
      icon: 'DollarOutlined',
      url: '/finance/index'
    },
    {
      path: '/settings',
      name: 'settings',
      label: '个人设置',
      icon: 'UserOutlined',
      url: '/settings/profile'
    }
  ]