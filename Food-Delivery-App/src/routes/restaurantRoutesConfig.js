import Meals from '../pages/restaurantOwner/Meals'
import Orders from '../pages/restaurantOwner/Orders'
import Users from '../pages/restaurantOwner/Users'

const routes =[
  {
    path:'/restaurant/meals',
    Component: Meals,
    exact: false
  },
  {
    path:'/restaurant/orders',
    Component: Orders,
    exact: false
  },
  {
    path:'/restaurant/users',
    Component: Users,
    exact: false
  },
]

export default routes
