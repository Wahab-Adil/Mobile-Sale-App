import { FaTh, FaRegChartBar, FaCommentAlt, FaCartPlus } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Avaliable Stack",
    icon: <FaTh />,
    path: "/avaliable",
  },
  {
    title: "Sale Stack",
    icon: <FaCartPlus />,
    path: "/sale",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
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
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
