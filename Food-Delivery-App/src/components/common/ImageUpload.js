import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { storage } from "../../firebase/firebase";
import uuid from 'react-uuid';
import {
    LoadingOutlined,
    PlusOutlined,
  } from '@ant-design/icons';

const ImageUpload = ({folder,onChange}) => {
    const [loading,setLoading] = useState(false);
    const [imageUrl,setImageUrl] = useState('');

    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        setLoading(true)
        return;
      }
      if (info.file.status === 'done') {
        setLoading(false)
        onChange(imageUrl)
      }
    };
  
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
  
    const customUpload = async ({ onError, onSuccess, file }) => {
      const metadata = {
          contentType: 'image/jpeg'
      }
      const storageRef = await storage.ref();
      const imageName = uuid()//generateHashName(); //a unique name for the image
      const imgFile = storageRef.child(folder+`/${imageName}.png`);
      try {
        const image = await imgFile.put(file, metadata);
        image.ref.getDownloadURL().then(url =>{
            setImageUrl(url);
            console.log(url);
            onSuccess(null, image);
        }).catch(e=>onError(e))
      } catch(e) {
        onError(e);
      }
    };
    
    const uploadButton = (
    <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div className="ant-upload-text">Upload</div>
    </div>
    );
    return (
        <Upload
        accept={[".jpg",".png"]}
        listType="picture-card"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customUpload}
        maxCount={1}
        multiple={false}
        disabled={loading}
        >
        {uploadButton}
        </Upload>
    );
  }

export default ImageUpload;