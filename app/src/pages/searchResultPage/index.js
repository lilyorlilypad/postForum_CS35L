import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import "./searchResults.css";
import "../home/index.scss";
import { Carousel, Card,Modal,Form,Input,Upload,message, Button } from 'antd';


export default class SearchResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: [],
            numResults: "10",
            searchTerm: "test printer",
            list: [
                {}, {}, {}, {}, {}, {}, {}, {}
            ],
            openModal:false,//control the parameter of the pop-up window
            loading :false,
            loaded: false,
            disabled:true,
            recent: "",
            url:'',
        }; 
        this.redirectProductPage = this.redirectProductPage.bind(this);
        this.filterResults = this.filterResults.bind(this)
        this.redirectSearchPage =this.redirectSearchPage.bind(this)
        
    }
  
    async componentDidMount(){
        console.log("tried to make request to server");
        const response = await fetch('http://localhost:8080/query',{method:'GET'});
        let data = await response.json();
        let size = Object.keys(data).length;
        for (let i = 0; i < size; i++){
            this.state.products.push(data[i]);
        }
        console.log(this.state.products);
        this.setState({loaded: true});
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
    
    filterResults(){
        console.log("Will Filter Results")
    }
    

    redirectProductPage() {

        console.log('Will Redirect To Product Page');
        this.props.history.push('/product')

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
            disabled: true
        })
        console.log("handleCancel() function called");
    }
    //Change the uploaded image to BASE64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    //Check for the uploaded photo
    beforeUpload(file) {
        return new Promise((resolve) => {
            let data = this.formRef.current.getFieldValue();
            file.name=data.name;
            console.log(file.name);
            return file;
        })
        

        /*
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Please upload JPG/PNG files! Please press cancel and try again');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Uploaded file cannot be greater than 2MB! Please press cancel and try again');
        }

        console.log(file.name);
        file.name = data.name;

        let data = this.formRef.current.getFieldValue();
        const formData = new FormData();
        formData.append('file', file, data.name);
        console.log(file.name)


        return formData;
        */
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
        //info.file.originalname = this.formRef.current.getFieldValue().name;
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
    
    imageURL(item){
        const reader = new FileReader();
        let url = "";
        if(item.images.length!==0) {
            const imageData = new Uint8Array(item.images[0].data.data); 
            console.log(imageData);
            console.log(item.images[0]);
            const blob = new Blob([imageData], { type: item.images[0].contentType });
            url = URL.createObjectURL(blob);

            console.log(url)
            return url;
        }
        //if (!item.images===undefined) return item.images[1];

        if (!item.images===undefined) return URL.createObjectURL(item.images[0]);
        //else return "";

    }
    redirectSearchPage(){
        this.props.history.push('/search')
    }

   render () {
        if (!this.state.loaded) return(<div>Loading ...</div>);
        console.log(this.state.products);
       return (
    <>
        <div className="conditionalBlur">
        {/* This is a placeholder for the header */}
        <div className="home">
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
                                        <button className="hello" onClick={this.redirectSearchPage}><SearchOutlined/></button>
                                    <div className="search-helper"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


         {/* Rendering products */}

         <div className=" flex justify-center">
             
         <div className="mainContent">
            
            <div className="searchResultText">

                {/* Rendering Filters */}
                <div className="filters">
                    <div className="popularFilters">
                        Popular Filters
                    </div>

                    <div className="filterBar">

                        <ul className="filterContainer">
                            <li className="filterButton">
                                <button onClick={this.filterResults}>Condition: Brand New</button>
                            </li>

                            <li className="filterButton">
                                <button onClick={this.filterResults}>Condition: Pre-Owned</button>
                            </li>

                            <li className="filterButton">
                                <button onClick={this.filterResults}>Price Range: Under $25</button>
                            </li>

                            <li className="filterButton">
                                <button onClick={this.filterResults}>Price Range: Under $50</button>
                            </li>

                            <li className="filterButton">
                                <button onClick={this.filterResults}>Price Range: Under $100</button>
                            </li>

                        </ul>

                    </div>
                </div>

                <div className="searchResults">
                    {this.state.numResults} Results for "{this.state.searchTerm}"
                </div>

            </div>
        



           {/* Rendering products */}
            <section  className="products  max-w-7xl mx-10 grid grid-cols-1 gap-10  " >

            <ul>
                 {this.state.products.map((item,index) => (
                    <li key={item.id}>

                        <div className="productContainer ">

                            <div className="productImage ">
                                <img className="image" src={this.imageURL(item)}></img>
               
                            </div>
                  
                            <div className="productInfo">

                                <div className="productTitle">
                                    <h1>{item.title} </h1>
                                </div>

                                <div className="productCondition">
                                    <h3>{item.summary}</h3>
                                </div>

                                <div className="postedDate">
                                    {item.createdAt}
                                </div>


                                <div className="priceAndSeller">
                                    <div className="productPrice">
                                        <span>{"$ "+item.price}</span>
                                    </div>

                                    <div className="sellerInfo">

                        
                                        <div className="productSeller">
                                            {item.seller}
                                        </div>
                        
                                    </div>
                                </div>
                                <div className="detailsContainer">
                                    <button className="detailsButton  px-4 bg-grey text-black uppercase font-bold rounded-lg shadow mt-5 w-full" onClick={this.redirectProductPage} >Details</button>
                                </div>
                            </div>  
                        </div>
                    </li>
                    ))}
            </ul>
            </section>
         </div>
        </div>

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
                                //beforeUpload={this.beforeUpload}
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
        
       
        </>
       )
   }
}
