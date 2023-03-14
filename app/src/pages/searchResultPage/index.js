import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import "./searchResults.css";
import "../home/index.scss";
import { Carousel, Card,Modal,Form,Input,Upload,message } from 'antd';


export default class SearchResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            products: [{ 
                id: 1,
                title: "Epson Expression Home XP-4205 Small-in-One Inkjet Printer, Scanner, Copier - Black",
                type: "Test Type",
                seller: "Mr. Egg",
                sellerLogo: require('./carey.jpeg'),
                price: "$100",
                postedDate: "Yesterday",
                condition: "Brand New",
                mainImage: './blue.jpeg',
                thumbnail: require('./printer.webp'),
                productPageLink: "",
            },],
            numResults: "10",
            searchTerm: "test printer",
            list: [
                {}, {}, {}, {}, {}, {}, {}, {}
            ],
            openModal:false,//control the parameter of the pop-up window
            loading :false,
            loaded: false,
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
                                <img className="image" src={item.thumbnail} alt=""  onClick={this.redirectProductPage} />
               
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
                                        <span>{item.price}</span>
                                    </div>

                                    <div className="sellerInfo">

                                        <div>
                                            <img className="sellerImage" src={item.sellerLogo} alt="" />
                                        </div>
                        
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
        
       
        </>
       )
   }
}
