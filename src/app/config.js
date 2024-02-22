import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import PaymentsIcon from "@mui/icons-material/Payments";
import UpdateIcon from "@mui/icons-material/Update";
import PaymentHistory from "../components/PaymentHistory";
import PaymentCart from "../components/PaymentCart";

export const DOMAIN_URL = process.env.REACT_APP_API_DOMAIN;
export const BASE_URL = process.env.REACT_APP_BACKEND_API;
export const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENTID;

export const QTY_ITEMS = [1, 2, 3, 4, 5];

export const FILTER_BY_RATING = [
  { value: "$lte 3", label: "Below 3" },
  { value: "$gt 3, $lt 4", label: "From 3 - 4" },
  { value: "$gte 4", label: "Above 4" },
];

export const FILTER_BY_PRICE = [
  { value: "$lte 500", label: "Below $500" },
  { value: "$gte 500, $lte 1500", label: "Between $500 - $1500" },
  { value: "$gte 1500", label: "Above $1500" },
];

export const FILTER_BY_BRAND = [
  { value: "Asian", label: "Asian" },
  { value: "Campus", label: "Campus" },
  { value: "Reebok", label: "Reebok" },
  { value: "Sparx", label: "Sparx" },
  { value: "Adidas", label: "Adidas" },
];

export const SORT_BY_ITEM = [
  { value: "createdAt: -1", label: "Newest" },
  { value: "price: -1", label: "Price: High-Low" },
  { value: "price: 1", label: "Price: Low-High" },
];

export const CONTACT = ["About Us", "Contact Us", "My Account", "Blog"];

export const ICON_LINK = [
  { name: "twitter", icon: <TwitterIcon /> },
  { name: "facebook", icon: <FacebookIcon /> },
  { name: "youtube", icon: <YouTubeIcon /> },
  { name: "instagram", icon: <InstagramIcon /> },
];

export const CURRENT_TAB = [
  { value: "Cart", icon: <PaymentsIcon />, component: <PaymentCart /> },
  { value: "History", icon: <UpdateIcon />, component: <PaymentHistory /> },
];
