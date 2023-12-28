import {
  FcOrganization,
  FcConferenceCall,
  FcEmptyTrash,
  FcAddDatabase,
  FcBusinessman,
  FcAssistant,
  FcMoneyTransfer,
  FcStatistics,
} from "react-icons/fc";

const menu = [
  {
    title: "Avaliable Stack",
    icon: <FcOrganization />,
    path: "/avaliable",
  },
  {
    title: "Sale Stack",
    icon: <FcConferenceCall />,
    path: "/sale",
  },
  {
    title: "Add Product",
    icon: <FcAddDatabase />,
    path: "/add-product",
  },
  {
    title: "Trash",
    icon: <FcEmptyTrash />,
    childrens: [
      {
        title: "Avaliable Stack",
        path: "/avaliable-trash",
      },
      {
        title: "Sale Stack",
        path: "/sale-trash",
      },
    ],
  },
  {
    title: "Expense & Loan",
    icon: <FcMoneyTransfer />,
    childrens: [
      {
        title: "Expense",
        path: "/expense",
      },
      {
        title: "Loan",
        path: "/loan",
      },
    ],
  },
  {
    title: "Report",
    icon: <FcStatistics />,
    childrens: [
      {
        title: "Purchase Report",
        path: "/report/purchase",
      },
      {
        title: "Avaliable Stack Report ",
        path: "/aval/purchase",
      },
      {
        title: "Out Stack Report ",
        path: "/out/purchase",
      },
      {
        title: "Date Wise Sale Report",
        path: "/report/sale",
      },
      {
        title: "Maximum Sold Products",
        path: "/max/sold",
      },
      {
        title: "Minimum Sold Products",
        path: "/min/Sold",
      },
      {
        title: "Expense Report",
        path: "/report/expense",
      },
      {
        title: "Loan Report",
        path: "/report/loan",
      },
    ],
  },
  {
    title: "Account",
    icon: <FcBusinessman />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FcAssistant />,
    path: "/contact-us",
  },
];

export default menu;
