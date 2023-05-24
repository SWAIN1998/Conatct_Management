import {
  AcUnit,
  Addchart,
  Category,
  ChangeCircle,
  Domain,
  Factory,
  GridView,
  Inventory,
  LocalFireDepartment,
  ManageAccounts,
  Notifications,
  Password,
  PeopleAlt,
  Person,
  ProductionQuantityLimits,
  Quiz,
  Reviews,
  Settings,
  Visibility,
} from "@mui/icons-material";

const useMenuItem = () => [
  {
    _id: "1",
    title: "Contact",
    route: "/admin",
    icon: <GridView className="text-xl" />,
  },
  {
    _id: "2",
    title: "Chart and Map",
    route: "/admin/chart-and-map",
    icon: <PeopleAlt className="text-xl" />,
  },
  {
    _id: "7",
    title: "Settings",
    icon: <Settings className="text-xl" />,
    submenus: [
      {
        _id: "7-0",
        route: "/admin/profile",
        title: "My Profile",
        icon: <Person />,
      },
      {
        _id: "7-1",
        route: "/admin/notifications",
        title: "Notifications",
        icon: <Notifications />,
      },
      {
        _id: "7-2",
        route: "/admin/change-password",
        title: "Change Password",
        icon: <ChangeCircle />,
      },
    ],
  },
];

export default useMenuItem;
