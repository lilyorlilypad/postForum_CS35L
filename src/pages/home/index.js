import React, { Component } from 'react'
import './index.scss'
import { Carousel, Card,Modal,Form,Input,Upload,message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Meta } = Card;
export default class Home extends Component {
    state = {
        list: [
            {}, {}, {}, {}, {}, {}, {}, {}
        ],
        openModal:false,//control the parameter of the pop-up window
        loading :false,
        url:''
    }
    formRef = React.createRef()
    uploadButton = (
        <div>
            +
            <div
                style={{
                    marginTop: 8,
                }}
            >
            </div>
        </div>
    );
    render() {
        return (
            <div className='home'>
                <div className="min-header">
                    <div className="wrap">
                        <div className="btn">
                            <span className="user-img">
                                <img src={require("../../assets/user.png")} alt="" />
                                <span className="logou" onClick={() => this.logouFn()}>Sign Out</span>
                            </span>
                            <span onClick={() => this.addGoodsFn()}>Sell Product</span>
                        </div>
                    </div>
                </div>
                <div className="header">
                    <div className="wrap header-box">
                        <div className="logo"></div>
                        <div className="search">
                            <div className="search-m">
                                <div className="form">
                                    <input type="text" className="search-keyword" placeholder="Notes" />
                                    <button onClick={() => this.props.history.push('/search') }><SearchOutlined/></button>
                                    <div className="search-helper"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Carousel autoplay>
                    <div className='item'>
                        <img src={require("../../assets/images1.jpeg")} alt="" />
                    </div>
                    <div className='item'>
                        <img src={require("../../assets/images2.jpeg")} alt="" />
                    </div>
                    <div className='item'>
                        <img src={require("../../assets/images3.jpeg")} alt="" />
                    </div>
                </Carousel>
                <div className="goods">
                    <div className="wrap">
                        <div className="recommend">
                            <div className="title">Chosen for You</div>
                            <div className="content">
                                {
                                    this.state.list.map((opt, index) => {
                                        return <Card
                                            onClick={() => this.props.history.push('/product')}
                                            className='option'
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={require("../../assets/images1.jpeg")} />}
                                        >
                                            <Meta title="Europe Street beat" description="www.instagram.com" />
                                        </Card>
                                    })
                                }
                            </div>
                        </div>
                        <div className="dropped">
                            <div className="title">Just Dropped</div>
                            <div className="content">
                                {
                                    this.state.list.map((opt, index) => {
                                        return <Card
                                            onClick={() => this.props.history.push('/product')}
                                            className='option'
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={require("../../assets/images1.jpeg")} />}
                                        >
                                            <Meta title="Europe Street beat" description="www.instagram.com" />
                                        </Card>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <div class="wrap">
                        <p>Welcome to UCLA market!</p>
                    </div>
                </div>
                {/* Add product pop-up window */}
                <Modal
                    title="Sell Product"
                    open={this.state.openModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        ref={this.formRef}
                        name="control-hooks"
                        onFinish={this.onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item name="name" label="Product Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="desc" label="Product Description" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Upload Image">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"//uploaded url
                                onChange={this.handleChange}
                            >
                                {this.state.url ? (
                                    <img
                                        src={this.state.url}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    this.uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        )
    }
    //Show the pop-up window
    addGoodsFn = () => {
        this.setState({
            openModal : true
        })
    }
    //close the pop-up window
    handleCancel = () => {
        this.setState({
            openModal : false
        })
    }
    //Change the uploaded image to BASE64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    //Check for the uploaded photo
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Please upload JPG/PNG files!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Uploaded file cannot be greater than 2MB');
        }
        return isJpgOrPng && isLt2M;
    };
    //Function for after finishing the uploading part
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({
                loading:true
            })
            return;
        }
        console.log(info.file,'infoinfoinfoinfo');//uploaded file
        //When doing the front-back merger, delete this return, use the following commented code
        return this.getBase64(info.file.originFileObj, (url) => {
            this.setState({
                loading:false,
                url
            })
        });
        /* if (info.file.status === 'done') {
            //Callback after successfully uploading the info
            this.getBase64(info.file.originFileObj, (url) => {
                this.setState({
                    loading:false,
                    url
                })
            });
        } */
    };
    //Button for OK in the pop-up window
    handleOk = () => {
        let params = {
            ...this.formRef.current.getFieldValue(),
            url:this.state.url
        }
        console.log(params,'Add info of the product');
        //If added the product info successfully, use the following code to close the window
        message.success('Added Successfully!');
        this.setState({
            openModal : false
        })
    }
    ///Sign out
    logouFn = () => {
        message.success('Sign Out Successfully!');
        this.props.history.push('/')
    }
}