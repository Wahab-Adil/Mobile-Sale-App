import {
  FcOrganization,
  FcConferenceCall,
  FcEmptyTrash,
  FcLineChart,
  FcBusinessman,
  FcAssistant,
  FcMoneyTransfer,
  FcComboChart,
  // Trash
  FcDataSheet,
  FcDoughnutChart,
  // loan & expense
  FcBriefcase,

  // report
  FcFinePrint,
  FcSafe,
  FcDeleteDatabase,
  FcCurrencyExchange,
  FcDebt,
  FcDonate,
  FcBullish,
  FcNegativeDynamic,
  FcInTransit,
  // profile
  FcPicture,
  FcPortraitMode,
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
    title: "Trash",
    icon: <FcEmptyTrash />,
    childrens: [
      {
        icon: <FcDataSheet />,
        title: "Avaliable Stack",
        path: "/avaliable-trash",
      },
      {
        icon: <FcDoughnutChart />,

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
        icon: <FcDonate />,
        title: "Expense",
        path: "/expense",
      },
      {
        icon: <FcBriefcase />,
        title: "Loan",
        path: "/loan",
      },
    ],
  },
  {
    title: "Report",
    icon: <FcComboChart />,
    childrens: [
      {
        icon: <FcFinePrint />,
        title: "Purchase",
        path: "/report/purchase",
      },
      {
        icon: <FcSafe />,
        title: "Avl-Stk ",
        path: "/aval/purchase",
      },
      {
        icon: <FcDeleteDatabase />,
        title: "Out-Stk ",
        path: "/out/purchase",
      },
      {
        icon: <FcInTransit />,
        title: "Sale",
        path: "/report/sale",
      },
      {
        icon: <FcBullish />,
        title: "Max-sale",
        path: "/max/sold",
      },
      {
        icon: <FcNegativeDynamic />,
        title: "Min-Sale",
        path: "/min/Sold",
      },
      {
        icon: <FcCurrencyExchange />,
        title: "Expense",
        path: "/report/expense",
      },
      { icon: <FcDebt />, title: "Loan", path: "/report/loan" },
    ],
  },
  {
    title: "Summery",
    icon: <FcLineChart />,
    path: "/report/summery",
  },
  {
    title: "Account",
    icon: <FcBusinessman />,
    childrens: [
      {
        icon: <FcPicture />,

        title: "Profile",
        path: "/profile",
      },
      {
        icon: <FcPortraitMode />,

        title: "Edit Profile",
        path: "/edit-profile",
      },
    ],
  },
  // {
  //   title: "Report Bug",
  //   icon: <FcAssistant />,
  //   path: "/contact-us",
  // },
];

export default menu;
