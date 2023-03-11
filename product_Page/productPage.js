import React from 'react';
import {AiOutlineHeart} from 'react-icons'
import "./Product.css";
// import {useForm} from 'react-hook-form'






export default class Product extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mainImage: require('./eggert.png'), //dummy image to be replaced by backend
            mainImageId: "",
            images: [{
                id: 1,
                mainImage: './blue.jpeg',  //dummy image name to be replaced by backend
                thumbnail: require('./blue.jpeg')  //dummy image to be replaced by backend
            },
            {
                id: 2,
                mainImage: './red.jpeg',  //dummy image name to be replaced by backend
                thumbnail: require('./red.jpeg')   //dummy image to be replaced by backend
            },
            {
                id: 3,
                mainImage: './purple.png',   //dummy image name to be replaced by backend
                thumbnail: require('./purple.png')   //dummy image to be replaced by backend
            },
            {
                id: 4,
                mainImage: './teal.png',   //dummy image to be replaced by backend
                thumbnail: require('./teal.png')  //dummy image to be replaced by backend
            },
            
            
        
        ],

            currUser: "Dummy User1",  //this will store the name of the Current User
            userImage: require('./eggert.png'), /* this is a dummy test image, will eventually show the image of the current User by backend */
            seller: "EggMaster", //this will store the seller of the product being shown

            //everything below is information about the product being shown
            title: "This is a test Title",
            price: "$150",
            Description: "Sample paragraph that I'm writing while my head is currently losing its brain but wow the rain. OMG what a day", 

            //everything below is for the comment section
            workingComment: "test working comment", //this is what is being inputted into the comment box
            Comments: [{  //this is an array of comments that is stored in the backend that belong to the current product being shown
                id: 1,
                commenter: "test commenter",
                commenterThumbnail: require('./carey.jpeg'),     /* this is a dummy test image, remember to delete this */
                description: "Hello this is a random test comment. How does this look? Does it run over the edge? Let's See. My name is Carey"
    
            },

            ]

        }; 


        this.postComment= this.postComment.bind(this);
        this.likePost = this.likePost.bind(this);

    }

    likePost(){

    }

    //function to retreive and set Main Image from database or API
    setMainImage(index){
        
    }



    //function to retreive arrays of main image  from database or API 
    setOtherImages(){

    }


    //function to set details about the current User through database or API
    setDescriptors(){

    }


    //will retrieve all the comments from the database/API
    getComments(){

    }

    //will post a comment to the website, database, and API
    postComment(description){

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


        // Add implementation where the comment can be stored in the backend or API


        //clear the working comment to prevent addign a duplicate comment
        this.setState({workingComment: ""});


    }

    render(){
        return(

            
            <>
            {/* this will be for inserting header */}
            <div className="text-center border-b-2 border-grey mb-10 pb-5 ">
                Insert Header Here and Search bar
            </div>


            {/*  This is for the product images */}
         <section className="max-w-7xl mx-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:place-items-center" >
            <article className="mt-2">
                <img src={this.state.mainImage} className="rounded-3xl h-96 w-screen mt-3 " alt="" />

                <ul className="flex items-center justify-start gap-5 flex-wrap mt-4 ">
                    {this.state.images.map((item,index) => (
                    <li key={item.id} onClick={() => {this.setState({mainImage: this.state.images[index].thumbnail, mainImageId: index});
                    console.log(this.state.mainImageId)}
                    }
                    className={
                        `${index === this.state.mainImageId && "border-2 border-black opacity-80 rounded-2xl"}
                           border-2 rounded-2xl overflow-hidden cursor-pointer`
                    }
                    >
                        <img src={item.thumbnail} alt="" className="w-20 rounded-xl" />
                    </li>
                    ))}
                </ul>


                

            </article>
                
            {/* This is for the product information*/}
            <article className="px-8 pb-10"> 
                <h1 className="bg-blue-300 py-1 px-2 text-blue uppercase tracking-wide font-bold inline-block rounded shadow mb-5 ">Seller: {this.state.seller}</h1>

                <div className="border-2 border-black shadow justify-center">
                </div>

                <h2 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl pt-10 ">{this.state.title}</h2>
                <p className="text-slate-600 mb-10 leading-relaxed ">{this.state.Description}</p>

                <div className="flex flex-wrap items-center justify-between lg:flex-col">
                    <ul className="flex items-center gap-5"> 
                        <li className="text-slate-900 font-bold text-3xl">{this.state.price}</li>
                    </ul>
                </div>

                <div>
                    <button className="flex items-center justify-center gap-4 py-2 px-4 bg-yellow-400 text-black uppercase font-bold rounded-lg shadow mt-5 w-full" onClick={() => {console.log('Clicked message seller')} }>Like</button>
                </div>
        
            </article>

        </section> 



        {/* This is for the comment section*/}
        <section className="max-w-7xl mx-32 grid grid-cols-1 lg:grid-cols-2 gap-10  ">
            <article>

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


            {/* This is to display the comment section */}
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

        </>
       
        
        );
    }
}



/* Things to do if finish with time:

1) Add an animation when adding a comment
2) Add a hovering animation to the comment button

*/