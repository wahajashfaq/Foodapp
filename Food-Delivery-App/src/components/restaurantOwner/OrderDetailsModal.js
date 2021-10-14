import React, { useMemo } from "react";
import moment from "moment";
import { Modal, Table, Row, Col, Timeline } from "antd";
import { ORDER_STATUS } from "../../constants/constants";

const OrderDetailsModal = ({ orderData, closeModal }) => {
  const visible = orderData ? true : false;
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
  const data = useMemo(() => {
    return orderData.meals.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        uid: item.uid,
        image: item.image,
      };
    });
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
    <Modal
      footer={null}
      title="Order Detail"
      visible={visible}
      width={"100%"}
      onCancel={(e) => closeModal()}
    >
      <Row>
        <Col lg={16}>
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
          <h1>
            Total Price: Rs.{" "}
            {data
              .map((item) => item.price * item.quantity)
              .reduce((a, b) => a + b)}
          </h1>
        </Col>
        <Col lg={8}>
          <Timeline mode="left">
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
        </Col>
      </Row>
    </Modal>
  );
};

export default OrderDetailsModal;
