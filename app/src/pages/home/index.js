import React, { Component } from 'react'
import './index.scss'
import { Carousel, Card,Modal,Form,Input,Upload,message, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Meta } = Card;


export default class Home extends Component {
    state = {
        products: [],
        list: [
            {}, {}, {}, {}, {}, {}, {}, {}
        ],
        openModal:false,//control the parameter of the pop-up window
        loading :false,
        url:'',
        disabled: true,
    }

    async componentDidMount(){
        try {
            
            console.log("tried to make request to server");
            const response = await fetch('http://localhost:8080/query',{method:'GET'});
            let data = await response.json();
            let size = Object.keys(data).length;
            for (let i = 0; i < size; i++){
                this.state.products.push(data[i]);
            }
            console.log(this.state.products);
            this.setState({loaded: true});  
        } catch (error) {
            console.error(error);
        }
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
                                    <input 
                                    type="text" 
                                    name="searchKeyword" 
                                    className="searchKeyword" 
                                    onChange={this.handleChange}
                                    placeholder="search for product name" />
                                    <button onClick={() => this.props.history.push(`/search/${this.state.searchKeyword}`) }><SearchOutlined/></button>
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
                                    this.state.products.map((opt, index) => {
                                        return <Card
                                            onClick={() => this.props.history.push(`/product/${opt._id}`)}
                                            // onClick={() => this.props.history.push('/product/:id' )}
                                            className='option'
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={require("../../assets/images1.jpeg")} />}
                                        >
                                            {<Meta title={opt.title} description={opt.description} />/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                        </Card>
                                    })
                                }
                            </div>
                        </div>  
                    </div>
                </div>
                <div className="footer">
                    <div className="wrap">
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
                        <Form.Item name="name" label="Product Title" rules={[{ required: true }]} >
                            <Input disabled={!this.state.disabled}/>
                        </Form.Item>
                        <Form.Item name="desc" label="Product Description" rules={[{ required: true }]}>
                            <Input disabled={!this.state.disabled}/>
                        </Form.Item>
                        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                            <Input prefix="$" disabled={!this.state.disabled}/>
                        </Form.Item>
                        <Form.Item name="confirm" style={{display: 'flex',justifyContent:'center'}}>
                            <Button type="default" size="large" onClick={async ()=>{
                                let data = this.formRef.current.getFieldValue();
                                let result = await fetch("http://localhost:8080/createPost", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                      },
                                    body: JSON.stringify({
                                        name: data.name,
                                        summary: data.desc,
                                        price: data.price,
                                      })
                                })
                                this.setState({disabled:false, recent:data.name});
                            }}>Confirm!</Button>
                        </Form.Item>
                        <Form.Item label="Upload Image">
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                data="{this.state.recent}"
                                showUploadList={false}
                                disabled={this.state.disabled}
                                encrypt="multipart/form-data"
                                action="http://localhost:8080/api/upload" //upload endpoint
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

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        //console.log(name)
        //console.log(value)
        //console.log(this.state.searchKeyword)
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
        fetch("http://localhost:8080/createPost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: params.name,
                summary: params.summary,
                price: params.price,
            }),
        });
        this.setState({
            openModal : false
        })
    }
    ///Sign out
    logouFn = () => {
        message.success('Sign Out Successfully!');
        this.props.history.push('/')
    }



    redirectSearchPage() {
        console.log('Will Redirect To Product Page');
        this.props.history.push('/search')
    }
}