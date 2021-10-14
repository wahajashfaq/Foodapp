import React from "react";
import { Spin } from "antd";

const Loader = ({wrapperCLass, loaderClass}) => {

    return(<div className={wrapperCLass}>
        <Spin className={loaderClass} size="large"/>
    </div>);
}

export default Loader;