import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import RestaurantSignup from "../pages/RestaurantSignup";
import LayoutRestaurant from "../components/layout/RestaurantLayout";
import { ROLE } from "../constants/constants";
import Menu from "../pages/Menu";
import Checkout from "../pages/user/Checkout";
import OrderHistory from "../pages/user/OrderHistory";
import OrderDetails from "../pages/user/OrderDetails";


const routes =[
  {
    path:'/',
    Component: Home,
    exact: true,
    isPrivate: false,
  },
  {
    path:'/login',
    Component: Login,
    exact: false,
    isPrivate: false,
  },
  {
    path:'/signup',
    Component: Signup,
    exact: false,
    isPrivate: false
  },
  {
    path:'/forgot-password',
    Component: ForgotPassword,
    exact: false,
    isPrivate: false
  },
  {
    path:'/partner/signup',
    Component: RestaurantSignup,
    exact: false,
    isPrivate: false
  },
  {
    path:'/restaurant',
    Component: LayoutRestaurant,
    exact: false,
    isPrivate: true,
    role: ROLE.RESTAURANT_OWNER
  },
  {
    path:'/menu/:id',
    Component: Menu,
    exact: true,
    isPrivate: false,
  },
  {
    path:'/checkout',
    Component: Checkout,
    exact: false,
    isPrivate: true,
    role: ROLE.USER
  },
  {
    path:'/orderhistory',
    Component: OrderHistory,
    exact: true,
    isPrivate: true,
    role: ROLE.USER
  },
  {
    path:'/orderdetail/:id',
    Component: OrderDetails,
    exact: true,
    isPrivate: true,
    role: ROLE.USER
  },
]

export default routes
