import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Table, Timeline } from "antd";
import { DB_COLLECTIONS, ORDER_STATUS } from "../../constants/constants";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import MainNav from "../../components/layout/MainNav";
import Cart from "../../components/common/Cart";
import { useStoreState } from "../../contexts/StoreContext";

const OrderDetails = () => {
  const { cartVisible } = useStoreState();
  const [orderData, setOrderData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const parms = useParams();
  const columns = [
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (src) => (
        <img src={src} style={{ width: 50, height: 50 }} alt="Meal" />
      ),
    },
    {
      title: "Id",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity ordered",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  useEffect(() => {
    const { id } = parms;
    db.collection(DB_COLLECTIONS.ORDERS)
      .doc(id)
      .onSnapshot((doc) => {
        setOrderData(doc.data());
        setLoading(false);
      });
  }, [parms]);

  const data = useMemo(() => {
    if (orderData) {
      return orderData.meals.map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          uid: item.uid,
          image: item.image,
        };
      });
    }
    return [];
  }, [orderData]);
  const compare = (a, b) => {
    if (a.time < b.time) {
      return -1;
    }
    if (a.time > b.time) {
      return 1;
    }
    return 0;
  };
  return (
    <>
      <MainNav />
      {!loading && (
        <div className="history-container">
          <div className="table-container detail-container container">
            <div>
              <div className="head-container">
                <div>
                  <h1>Orders History</h1>
                </div>
                <div>
                  <h1 className="price">
                    Total Price: Rs.{" "}
                    {data
                      .map((item) => item.price * item.quantity)
                      .reduce((a, b) => a + b)}
                  </h1>
                </div>
              </div>
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
            <div>
              <Timeline mode="left" className="timeline">
                {orderData.status.sort(compare).map((item) => {
                  if (ORDER_STATUS.PLACED === item.value)
                    return (
                      <Timeline.Item
                        color="blue"
                        label={moment(item.time * 1000).format("LLLL")}
                      >
                        {item.value}
                      </Timeline.Item>
                    );
                  else if (ORDER_STATUS.CANCELED === item.value)
                    return (
                      <Timeline.Item
                        color="red"
                        label={moment(item.time * 1000).format("LLLL")}
                      >
                        {item.value}
                      </Timeline.Item>
                    );
                  else if (ORDER_STATUS.PROCESSING === item.value)
                    return (
                      <Timeline.Item
                        color="purple"
                        label={moment(item.time * 1000).format("LLLL")}
                      >
                        {item.value}
                      </Timeline.Item>
                    );
                  else if (ORDER_STATUS.IN_ROUTE === item.value)
                    return (
                      <Timeline.Item
                        color="orange"
                        label={moment(item.time * 1000).format("LLLL")}
                      >
                        {item.value}
                      </Timeline.Item>
                    );
                  return (
                    <Timeline.Item
                      color="green"
                      label={moment(item.time * 1000).format("LLLL")}
                    >
                      {item.value}
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </div>
          </div>
        </div>
      )}
      <Cart visible={cartVisible} />
    </>
  );
};

export default OrderDetails;
