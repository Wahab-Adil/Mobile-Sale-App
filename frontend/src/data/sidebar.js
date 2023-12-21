import {
  FcOrganization,
  FcConferenceCall,
  FcEmptyTrash,
  FcAddDatabase,
  FcBusinessman,
  FcAssistant,
} from "react-icons/fc";
import { BiImageAdd } from "react-icons/bi";

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
