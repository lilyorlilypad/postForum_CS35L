import React from 'react';
import "./searchResults.css";
// import {useForm} from 'react-hook-form'






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


                
    
            },
            { 
                id: 2,
                title: "UCLA Computer Science Maniac For Sale or Rent",
                type: "Test Type",
                seller: "Mr. Egg",
                sellerLogo: require('./carey.jpeg'),
                price: "$100",
                postedDate: "Yesterday",
                condition: "Brand New",
                mainImage: './blue.jpeg',
                thumbnail: require('./eggert.png'),
                productPageLink: "",
                
    
            },
            { 
                id: 3,
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
                
    
            },
            

        ],

            numResults: "10",
            searchTerm: "test printer",


        }; 


        this.redirectProductPage = this.redirectProductPage.bind(this);
        this.filterResults = this.filterResults.bind(this)
        
    }

    
    filterResults(){
        console.log("Will Filter Results")
    }
    

    redirectProductPage() {

        console.log('Will Redirect To Product Page');

    }


    

   render () {
       return (

    <>



        <div className="conditionalBlur">

        {/* This is a placeholder for the header */}
        <div className="text-center border-b-2 border-grey mb-10 pb-5 ">

            Header and Search Bar Will Go Here
        </div>


         {/* This is for the products that are render */}

         <div className=" flex justify-center">
             
         <div className="mainContent">
            
            <div className="searchResultText">

                {/* This is for the button filters */}
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
        



           {/* This for displaying all of the results that showed up */}
            <section  className="products  max-w-7xl mx-10 grid grid-cols-1 gap-10  " >

            <ul>
                 {this.state.products.map((item,index) => (
                    <li key={item.id}>

                        <div className="productContainer ">

                            <div className="productImage ">
                                <img className="image" src={item.thumbnail} alt="" />
               
                            </div>
                  
                            <div className="productInfo">

                                <div className="productTitle">
                                    <h1>{item.title} </h1>
                                </div>

                                <div className="productCondition">
                                    <h3>{item.condition}</h3>
                                </div>

                                <div className="postedDate">
                                    {item.postedDate}
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

        </div>
        
       
        </>
       )
   }
}
