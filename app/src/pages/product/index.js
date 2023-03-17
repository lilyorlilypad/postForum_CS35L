import React, { Component } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import {AiOutlineHeart} from 'react-icons/ai';
import {AiFillHeart} from 'react-icons/ai';
import { FaBeer } from 'react-icons/fa';
import { Carousel, Card,Modal,Form,Input,Upload,message } from 'antd';
import "./Product.css";
import "../home/index.scss";




export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ActualProduct: null,
            id: "defaultID",
            products: [],
            mainImage: require('./eggert.png'), //this is default?
            mainImageId: "",
            reload: true,
            images: [{
                id: 1,
                mainImage: './blue.jpeg',
                thumbnail: require('./blue.jpeg')
            },],
            currUser: "Dummy User1",
            userImage: require('./eggert.png'), /* this is a dummy test image, remember to delete this */
            seller: "EggMaster",
            title: "",
            price: "$150",
            Description: "",
            workingComment: "",
            likeCount: 1,
            alreadyLiked: false,
            Comments: [{ 
                //id: 1,
                //commenter: "test commenter",
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
            loaded: false,

        }; 


        this.postComment= this.postComment.bind(this);
        this.likePost = this.likePost.bind(this);
        this.redirectSearchPage = this.redirectSearchPage.bind(this)
        this.updateLikeCount = this.updateLikeCount.bind(this)

    }

    async componentDidMount(){
        try {
            console.log("Trying to make request to server...");
            const response = await fetch(`http://localhost:8080/query`,{method:'GET'});
            let data = await response.json();
            let size = Object.keys(data).length;
            for (let i = 0; i < size; i++){
                this.state.products.push(data[i]);
            }
            
            const currenturl = window.location.href;
            let tempid = currenturl.substring(currenturl.lastIndexOf("/")+1);
            this.state.id = tempid;

            console.log("This is the ID!!!!!!!!!")
            console.log(tempid)
            console.log(this.state.id)
            console.log(this.state.products);
            for (let i = 0; i < this.state.products.length; i++){
                //console.log(this.state.products[i]);
                if(this.state.products[i]._id === this.state.id){
                    console.log("added!")
                    // ActualProduct.push(this.state.products[i]);
                    this.state.ActualProduct = this.state.products[i];
                    console.log(this.state.ActualProduct);
                }
            }
            //console.log(this.state.ActualProduct);
            //reset stuff in the this.state
            let temp = this.state.ActualProduct.title;
            this.setState({title: temp});
            temp = this.state.ActualProduct.price;
            this.setState({price: ("$" + temp)});
            temp = this.state.ActualProduct.summary;
            this.setState({Description: temp});
            temp = this.state.ActualProduct.comment;
            this.setState({})
            console.log(this.state.id);
            this.setState({Comments: this.state.ActualProduct.comments});
            this.setState({seller: this.state.ActualProduct.userEmail});
            this.setState({likeCount: this.state.ActualProduct.numberOfLikes});
            console.log();
            console.log();
            console.log();
            console.log(this.state.ActualProduct);
            console.log(this.state.Comments);
            this.setState({loaded: true});  


        } catch (error) {
            console.error(error);
        }
    }

    async likePost(){
        let result = await fetch('http://localhost:8080/api/addLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.state.id}),
        })
        console.log(this.state.id);
        console.log(result);
        window.location.reload();

    }


    //function to retreive and set Main Image
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



    //function to retreive arrays of main image
    setOtherImages(){

    }


    //should be called upon construction or after?? Don't think it matters but will pull data from back-end
    setDescriptors(){

    }


    //will retrieve all the comments from the database/API
    // async getComments() {
    //     const postId = this.state.products._id; // Replace with the actual post ID
    //     const response = await fetch(`http://localhost:8080/post/${postId}/comment`);
    //     const comments = await response.json();
    //     this.setState({ comments });
    // }

    //will post a comment to the website, database, and API
    async postComment(description){

        console.log("im posting comment");

        if(this.state.workingComment === "")
            return;

        console.log("a comment was added");

        
        var numComments = this.state.Comments.length;
        let newComment = {
            id: numComments+1,
            commenter: String(this.state.currUser),
            commenterThumbnail: require('./carey.jpeg'),     /* this is a dummy test image, remember to delete this */
            description: this.state.workingComment,
        };
        //add comment to the array of other existing comments
        let result = await fetch('http://localhost:8080/api/newComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.state.id, comment:newComment})
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            //add comment to the array of other existing comments
            //this.setState({ Comments: this.state.Comments.concat(data) });
            //clear the working comment to prevent adding a duplicate comment
            this.setState({ workingComment: "" });
            console.log(this.state.Comments)
        }).then(()=>{window.location.reload(true);})
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
        //this.setState({Comments: this.state.Comments.concat(newComment)});
        //clear the working comment to prevent addign a duplicate comment
        //this.setState({workingComment: ""});

        console.log(this.state.Comments)
        window.location.reload(true);
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
    reRender = () => {
        this.forceUpdoate();
    }

    updateLikeCount () {
        console.log("Will update like button")
        if (this.state.alreadyLiked === false)
        {
            this.state.likeCount += 1;
            this.state.alreadyLiked = true;
            console.log("increased like count");
            console.log("the like count is now: " + this.state.likeCount)
            // return;
        }
        else if (this.state.likeCount != 0){
            this.state.likeCount -= 1;
            this.state.alreadyLiked = false;
            console.log("decreased like count");
            console.log("the like count is now: " + this.state.likeCount)
            // return;

        }
            

    }

    render(){
        if(!this.state.loaded){
            return(<div>Loading...</div>)
        }
        
        if (!this.state.products) {
            console.log('Products is null or undefined');
            return;
          }
        
        
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

                        </div>
                    </div>
                </div>
                    <div className="header">
                        <div className="wrap header-box">
                            <div className="logo"></div>
                            <div className="search">
                                <div className="search-m">
                                    <div className="form">
                                        <input type="text" className="searchKeyword" placeholder="Notes" />
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
            
                <img src={this.imageURL(this.state.ActualProduct)} className="rounded-3xl h-96 w-screen mt-3 " alt="" />

                <div className="likeContainer">
                    {/* Display unfilled like button */ }
                    { !(this.state.alreadyLiked) && 
                    <div className="likeButton" >
                        <button className="flex" onClick={() => {
                            this.likePost();
                            }} > <AiOutlineHeart className="flex mr-2 mt-1" />  Liked by {this.state.likeCount} </button>
                    </div>} 
                    {/* Display filled like button */ }
                    { this.state.alreadyLiked && <div className="likeButton bg-red-500 flex" >
                        <button className="flex " onClick={() => {
                            this.likePost();
                            }}> <AiFillHeart className="flex mr-2 mt-1"/>  Liked by {this.state.likeCount} </button>
                    </div>} 

                </div>

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

                    <input type="text" className="formElement" placeholder="Add a comment..." onChange = { (e) => this.setState({workingComment: e.target.value})} />

                </div>

                <div className="sendContainer">
                    <div className="commentButton" >
                        <button type="button" onClick={() => {
                            this.postComment();
                            }} >Send</button>
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



        

        </div>
       
        
        );
    }
}

