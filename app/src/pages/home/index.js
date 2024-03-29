import React, { Component } from 'react'
import './index.scss'
import { Carousel, Card,Modal,Form,Input,Upload,message, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Meta } = Card;


export default class Home extends Component {
    state = {
        products: [],
        recentProducts: [],
        popProducts: [],
        list: [
            {}, {}, {}, {}, {}, {}, {}, {}
        ],
        openModal:false,//control the parameter of the pop-up window
        loading :false,
        url:'',
        disabled: true,
        loaded: false,
    }

    async componentDidMount(){
        try {
            const token = document.cookie
            console.log("token is: ")
            console.log(token)
            //const headers = {'Authorization': `Bearer ${token}`};
            console.log("tried to make request to server");
            const response = await fetch('http://localhost:8080/query',{
                method:'GET',
                credentials: 'include' // add this option to include cookies},
        });
            let data = await response.json();
            let size = Object.keys(data).length;
            for (let i = 0; i < size; i++){
                this.state.products.push(data[i]);
            }


            let mostsize = 0;
            
            
            if (size < 4){
                this.setState({popProducts: this.state.products});
                this.setState({recentProducts: this.state.products});
            }
            else {
                console.log(this.state.products)
                let added = [];
                for (let j = 0; j < 4; j ++){
                    
                    let randomArr = [];
                    let most = -1;
                    let mostIndex = -1;
                    for(let i = 0; i < size; i++){
                        console.log(i, this.state.products[i].numberOfLikes);
                        if (!added.includes(i) && this.state.products[i].numberOfLikes >= most){
                            mostIndex = i;
                            console.log(mostIndex);
                            most = this.state.products[i].numberOfLikes;
                        }
                    }
        
                    this.state.popProducts.push(this.state.products[mostIndex]);
                    added.push(mostIndex);
                }
                const lastFour= this.state.products.slice(-4)
                for (let i=3; i>=0; i--) {
                    this.state.recentProducts.push(lastFour[i])
                /*let min = 0; let max = size-1;
                let random = Math.floor(Math.random()*(max-min+1)+min);
                while (randomArr.includes(random)){
                    random = Math.floor(Math.random()*(max-min+1)+min);
                }
                this.state.recentProducts.push(this.state.products[random]);
                randomArr.push(random);*/
            }
            }
            
            
            console.log(this.state.products);
            console.log(this.state.popProducts);
            console.log(this.state.recentProducts);
            this.setState({loaded: true});  
        } catch (error) {
            console.error(error);
        }
    }

    imageURL(item){
        const reader = new FileReader();
        let url = "";
        if(item.images.length!==0) {
            const imageData = new Uint8Array(item.images[0].data.data); 
            const blob = new Blob([imageData], { type: item.images[0].contentType });
            url = URL.createObjectURL(blob);
            return url;
        }
        //if (!item.images===undefined) return item.images[1];

        if (!item.images===undefined) return URL.createObjectURL(item.images[0]);
        //else return "";

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
        if(!this.state.loaded){
            return(<div>Loading...</div>)
        }

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
                                    placeholder="Check out all products & services!" />
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
                            <div className="title">Most Liked</div>
                            <div className="content">
                                {
                                    this.state.popProducts.map((opt, index) => {
                                        return <Card
                                            onClick={() => this.props.history.push(`/product/${opt._id}`)}
                                            // onClick={() => this.props.history.push('/product/:id' )}
                                            className='option'
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={this.imageURL(opt)} />}
                                        >
                                            {<Meta title={opt.title} description={opt.summary} />/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                        </Card>
                                    })
                                }
                            </div>
                            <div className="title">Just Dropped</div>
                            <div className="content">
                                {
                                    this.state.recentProducts.map((opt, index) => {
                                        return <Card
                                            onClick={() => this.props.history.push(`/product/${opt._id}`)}
                                            // onClick={() => this.props.history.push('/product/:id' )}
                                            className='option'
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={this.imageURL(opt)} />}
                                        >
                                            {<Meta title={opt.title} description={opt.summary} />/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
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
                        <Form.Item name="email" label="Contact Email" rules={[{ required: true }]}>
                            <Input disabled={!this.state.disabled}/>
                        </Form.Item>
                        <Form.Item name="confirm" style={{display: 'flex',justifyContent:'center'}}>
                            <Button type="default" size="large" onClick={async ()=>{
                                let data = this.formRef.current.getFieldValue();
                                let result = await fetch("http://localhost:8080/createPost", {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                      },
                                      credentials: 'include', // add this option to include cookies
                                    body: JSON.stringify({
                                        name: data.name,
                                        summary: data.desc,
                                        price: data.price,
                                        userEmail: data.email,
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
            openModal : false,
            disabled: true,
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
        if (info.file.status === 'done') {
            //Callback after successfully uploading the info
            this.getBase64(info.file.originFileObj, (url) => {
                this.setState({
                    loading:false,
                    url
                })
            });
        } 
    };

    handleChange = event => {
        //const { name, value } = event.target;
        //this.setState({ [name]: value });
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
        
        this.setState({
            openModal : false,
            disabled: false,
        })
        window.location.reload(true);
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