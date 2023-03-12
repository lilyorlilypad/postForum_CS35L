import React from 'react';
import "./Product.css";


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

            ]

        }; 


        this.postComment= this.postComment.bind(this);
        this.likePost = this.likePost.bind(this);

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

    render(){
        return(

            
            <div>
            {/* this will be for inserting header */}
            <div className="text-center border-b-2 border-grey mb-10 pb-5 ">
                Insert Header Here and Search bar
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

        </div>
       
        
        );
    }
}



/* Things to do if finish with time:

1) Add an animation when adding a comment
2) Add a hovering animation to the comment button
3)Add a like button, when clicked it 

*/