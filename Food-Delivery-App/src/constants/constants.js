const ROLE = {
    USER: "USER",
    RESTAURANT_OWNER: "RESTAURANT OWNER"
}

const DB_COLLECTIONS = {
    USERS: "users",
    RESTAURANTS: "restaurants",
    MEALS: "meals",
    ORDERS: "orders",
}

const RESTAURANT_STATUS = {
    INACTIVE: "inactive",
    ACTIVE: "active",
}

const STORAGE = {
    RESTAURANT: "restaurant",
    MEAL: "meal",
}

const ORDER_STATUS = {
    PLACED: "Placed",
    CANCELED: "Canceled",
    PROCESSING: " Processing",
    IN_ROUTE: "In Route",
    DELIVERED: "DELIVERED"
}

export { ROLE, DB_COLLECTIONS, STORAGE, RESTAURANT_STATUS, ORDER_STATUS };