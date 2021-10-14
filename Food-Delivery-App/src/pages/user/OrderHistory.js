import React, { useEffect, useMemo, useState } from "react";
import { Button, Table, Tag, message } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DB_COLLECTIONS, ORDER_STATUS } from "../../constants/constants";
import { db } from "../../firebase/firebase";
import { addOrder } from "../../firebase/actions";
import { useAuth } from "../../contexts/AuthContext";
import MainNav from "../../components/layout/MainNav";
import Cart from "../../components/common/Cart";
import { useStoreState } from "../../contexts/StoreContext";
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { cartVisible } = useStoreState();
  const { currentUser } = useAuth();
  const history = useHistory();
  const columns = [
    {
      title: "Sr.",
      dataIndex: "sr",
      key: "sr",
    },
    {
      title: "Id",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Restaurant Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Restaurant Contact",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Total Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        if (ORDER_STATUS.PLACED === status.val)
          return <Tag color="blue">{status.val}</Tag>;
        else if (ORDER_STATUS.CANCELED === status.val)
          return <Tag color="red">{status.val}</Tag>;
        else if (ORDER_STATUS.PROCESSING === status.val)
          return <Tag color="purple">{status.val}</Tag>;
        else if (ORDER_STATUS.IN_ROUTE === status.val)
          return <Tag color="orange">{status.val}</Tag>;
        else if (ORDER_STATUS.DELIVERED === status.val)
          return <Tag color="green">{status.val}</Tag>;
      },
    },
    {
      title: "Update Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        if (ORDER_STATUS.PLACED === status.val)
          return (
            <Button
              type="danger"
              onClick={(e) => changeStatus(ORDER_STATUS.CANCELED, status.uid)}
            >
              Cancel Order
            </Button>
          );
      },
    },
    {
      title: "View",
      key: "view",
      dataIndex: "uid",
      render: (val) => (
        <Button
          type="link"
          onClick={(e) => {
            history.push("/orderdetail/" + val);
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const changeStatus = (status, uid) => {
    const order = orders.find((item) => item.uid === uid);
    order.status.push({ value: status, time: moment().unix() });
    addOrder(order)
      .then((res) => {
        message.success("Status updated!");
      })
      .catch((err) => {
        message.error("Somethiong went wrong could not change status");
      });
  };

  useEffect(() => {
    db.collection(DB_COLLECTIONS.ORDERS)
      .where("user.uid", "==", currentUser.uid)
      .onSnapshot((querySnapshot) => {
        let orders = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data());
        });
        setOrders(orders);
      });
  }, [currentUser.uid]);

  const data = useMemo(() => {
    const compare = (a, b) => {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    };
    return orders.map((item, index) => {
      return {
        sr: index + 1,
        uid: item.uid,
        name: item.restaurant.name,
        email: item.restaurant.email,
        phone: item.restaurant.phone,
        price: item.meals
          .map((obj) => obj.price * obj.quantity)
          .reduce((a, b) => a + b),
        status: {
          val: item.status.sort(compare)[item.status.length - 1].value,
          uid: item.uid,
        },
      };
    });
  }, [orders]);

  return (
    <>
      <MainNav />
      <div className="history-container">
        <div className="table-container container">
          <h1>Orders History</h1>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              total: data.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} / ${total} items`,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
              defaultCurrent: 1,
            }}
          />
        </div>
      </div>
      <Cart visible={cartVisible} />
    </>
  );
};

export default OrderHistory;
