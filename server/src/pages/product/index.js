import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Carousel, Card,Modal,Form,Input,Upload,message } from 'antd';
import "./Product.css";
import "../home/index.scss";



export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mainImage: require('./eggert.png'), //this is default?
            mainImageId: "",
            images: [{
                id: 1,
                mainImage: './blue.jpeg',
                thumbnail: require('./blue.jpeg')
            },            
        
        ],
            likedStatus: false,
            currUser: "Dummy User1",
            userImage: require('./eggert.png'), /* this is a dummy test image, remember to delete this */
            seller: "EggMaster",
            title: "This is a test Title",
            price: "$150",
            Description: "Sample paragraph that I'm writing while my head is currently losing its brain but wow the rain. OMG what a day",
            workingComment: "test working comment",
            Comments: [{ 
                id: 1,
                commenter: "test commenter",
                commenterThumbnail: require('./carey.jpeg'),     /* this is a dummy test image, remember to delete this */
                description: "Hello this is a random test comment. How does this look? Does it run over the edge? Let's See. My name is Carey"
    
            },

            ],

            numResults: "10",
            searchTerm: "test printer",
            list: [
                {}, {}, {}, {}, {}, {}, {}, {}
            ],
            openModal:false,//control the parameter of the pop-up window
            loading :false,
            url:'',

        }; 


        this.postComment= this.postComment.bind(this);
        this.likePost = this.likePost.bind(this);
        this.redirectSearchPage = this.redirectSearchPage.bind(this)

    }

    likePost(){

    }

    //function to retreive and set Main Image
    setMainImage(index){
        
    }



    //function to retreive arrays of main image
    setOtherImages(){

    }


    //should be called upon construction or after?? Don't think it matters but will pull data from back-end
    setDescriptors(){

    }


    //will retrieve all the comments from the database/API
    getComments(){

    }

    //will post a comment to the website, database, and API
    postComment(description){

        console.log("a comment was added");

        if(this.state.workingComment === "")
            return;

        var numComments = this.state.Comments.length;
        

        let newComment = {
            id: numComments+1,
            commenter: String(this.state.currUser),
            commenterThumbnail: require('./carey.jpeg'),     /* this is a dummy test image, remember to delete this */
            description: this.state.workingComment,

        };

        //add comment to the array of other existing comments
        this.setState({Comments: this.state.Comments.concat(newComment)});

        //clear the working comment to prevent addign a duplicate comment
        this.setState({workingComment: ""});

        console.log(this.state.Comments)

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
    
    redirectSearchPage() {
        console.log('Will Redirect To Product Page');
        this.props.history.push('/search')
    }

    render(){
        return(

            
            <div>
            {/* this will be for inserting header */}
            
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
                                        <button onClick={this.redirectSearchPage} ><SearchOutlined/></button>
                                        <div className="search-helper"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

         <section className="max-w-7xl mx-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:place-items-center " >
            <article className="mt-2">
                <img src={this.state.mainImage} className="rounded-3xl h-96 w-screen mt-3 " alt="" />

            </article>
                
            {/* will show all the product info */}
            <article className="px-8 pb-10"> 
                <h1 className="bg-blue-300 py-1 px-2 text-blue uppercase tracking-wide font-bold inline-block rounded shadow mb-5 ">Seller: {this.state.seller}</h1>

                <div className="border-2 border-black shadow justify-center">
                </div>

                <h2 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl pt-10 ">{this.state.title}</h2>
                <div>
 
                    <p className="flex items-center justify-center gap-4 py-2 px-4 bg-yellow-400 text-black  rounded-lg shadow mt-5 w-full ">{this.state.Description}</p>
                </div>

                <div className="flex flex-wrap justify-between lg:flex-col">
                    <ul className="flex items-center gap-5"> 
                        <li className=" text-slate-900 font-bold text-4xl mt-10 justify-center items-center">{this.state.price}</li>
                    </ul>
                </div>
        
            </article>

        </section> 

        <section className="max-w-7xl mx-32 grid grid-cols-1 lg:grid-cols-2 gap-10  ">
            <article>


            {/* This is for the like button*/}


            <div className="commentSection">
            
                <div className="identifier">
                    <div className="userImage">
                        <img src={this.state.userImage} className="rounded-full" alt="" />
                    </div>

                    <input type="text" className="formElement" placeholder="Add a comment..."  onChange = { (e) => this.setState( { workingComment: e.target.value }  )    } />

                </div>

                <div className="sendContainer">
                    <div className="commentButton" >
                        <button type="button" onClick={() => this.postComment('test')} >Send</button>
                    </div>
                </div>

            

            </div>

            </article>


            {/* this is for the comment section, will use a function call to dynamically display comments along with the image of the user that commented.
             This will make get data from the backend? */}
            <article>
                <div className="border"></div>

                <div className="comments">

                    <ul id="commentList">
                        {this.state.Comments.map((comment,index) => (
                    <li key={comment.id} className="userComment">
                        <img src={comment.commenterThumbnail} alt="" className="commentImage" />
                        <div className="commentWords">
                            {comment.description}
                        </div>
                    </li>
                    ))}
                    </ul>

                </div>
                
            </article>
        </section>



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
       
        
        );
    }
}

