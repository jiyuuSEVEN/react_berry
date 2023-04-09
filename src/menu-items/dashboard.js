// assets
import { DashboardOutlined, FileOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    FileOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'web-page',
            title: 'WebPage',
            type: 'item',
            url: '/web-page',
            icon: icons.FileOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
