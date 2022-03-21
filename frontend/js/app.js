//this file is for testing the document ready fucntions that interxt with the backend (addPortfolios, deletePortfolos, UpdatePortfolios and getAllPortfolios)
//these functions will be copy pasted into the main script when complete
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

console.log('linked');// checks script is linked to the html
console.log(sessionStorage);
// <--! Global backend constants start here !-->

// <--! Global backend constants end here !-->
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// <--! document ready code starts here !-->

$(document).ready(function(){
let url; //declares URL for below functions


// <--! below ajax function configures the sever url and port !-->
$.ajax({
    url: 'config.json', //acesses from end config.json
    type: 'GET',
    dataType: 'json',
    success:function(configData){
      console.log(configData.SERVER_URL,configData.SERVER_PORT );
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
        console.log(url);
        cardLoad(url);//activates cardLoad function below
    },
    error:function(error){
      console.log(error);
    
    }
  })
  // <--! ajax that determiens server and port ends here !-->

  // <--! function for loading cards starts here  !-->
function cardLoad(url) {
  $.ajax({
    url: `http://${url}/allPortfoliosFromDB`,
    type: 'GET',
    dataType: 'JSON',
    success: function(portfoliosfromMongo){
      var i;

      //below ID tag 'card_Result' is to match the container where the cards appear
      document.getElementById('cardResult').innerHTML = "";

      for(i=0;i<portfoliosfromMongo.length;i++){
        document.getElementById('cardResult').innerHTML +=
        `

        `

    }
    //above is the append for the cards. this is just a template to be used to create the cards, providing the designer with the right tags.
    //note - do not add comments between the backticks, they will show up in the HTML. 
}, 
error:function(){
  console.log('unable to load portfolios');
}

})
}
  // <--! function for loading cards ends here  !-->

  // <--! function for adding portfolios starts here  !-->
$('#addaPortfolio').click(function(){
  //above id tage is connected to the add porfolio button on the form
    event.preventDefault();
   //below are the variables that are used by the portfolio model, they get the right data to add from inputs on the form with the following tags:
   //#portfolio-name, #portfolio-author, #portfolio-imageurl, #portfolio-userurl and #portfolio-desc
   
    let name = $('#portfolioName').val(); 
    let author = $('#portfolioAuthor').val(); 
    let image_url = $('#portfolioImageurl').val(); 
    let user_url = $('#portfolioUserurl').val(); 
    let desc = $('#portfolioDesc').val(); 
    console.log(name, author, image_url, user_url, desc); //logs the variables for the model in the console.
    //below is an alert message if a field has not been filled out
    if (name == '' || author == '' || image_url == '' || user_url == '' || desc == ''){
      alert('Please enter all details'); 
    } else {
    // ajax function that takes the inputted varaibles and POSTs them to the backend and database
      $.ajax({
        url : `http://${url}/addPortfolios`,
        type : 'POST',
        data :{
          name: name,
          author: author,          
          image_url: image_url,
          user_url: user_url,
          desc: desc
        },
        success : function(Portfolios){  
          console.log(Portfolios);
          alert ('Portfolio sucessfully added'); // alert message for adding a portfolio sucessfully, could be replaced with more visually appealing element
        },
        error : function(){
          console.log('error: cannot call api');
        }// end of error log
      })// end of ajax
    }//end of else
  });
 // <--! function for adding portfolios ends here  !-->

 // <--! function for deleting portfolios starts here  !-->
 $('#deleteaPortfolio').click(function(){
    //above is the id tag for the delete button
    event.preventDefault();
    let portfoliosId = $('#deletePortfoliosId').val();
    //above is the id for the input that a user types the IDs to be deleted into
    console.log(portfoliosId);
    if (portfoliosId == ''){
      alert('Please enter the portfolio ID to delete the product');
    } else {
      $.ajax({
        url : `http://${url}/deletePortfolios/${portfoliosId}`,
        type:'DELETE',
        success : function(){
          console.log('deleted');
        }, //success
        error:function(){
          console.log('error: cannot call api');
        }//error
      })//ajax
    }//if
  })//end
   // <--! function for deleting portfolios ends here  !-->
   
 // <--! function for updating portfolios starts here  !-->
 $('#updateaPortfolio').click(function(){
    //above is the id tag for the button that runs this function
   event.preventDefault();
   let portfoliosId = $('#updPortfoliosid').val();
   let portfoliosName = $('#updPortfoliosname').val();
   let portfoliosAuthor = $('#updPortfoliosauthor').val();
   let imageurl = $('#updImageurl').val();
   let userurl = $('#updUserurl').val();
   let portfoliosDesc = $('#updPortfoliosdesc').val();
   //above are the id tags used for input fields in the update portfolios form
   console.log(portfoliosId, portfoliosName, portfoliosAuthor, imageurl, userurl, portfoliosDesc);
   //logs content of the inputs
   if ( portfoliosId == ''){
     alert('Please enter portfolio ID for updating');
     //error fnctino if no id inputted
   } else {
     //below is ajax function for sending update PATCH to the database
     $.ajax({
       url: `http://${url}/updatePortfolios/${portfoliosId}`,
       type: 'PATCH',
       data:{
         name : portfoliosName,
         author: portfoliosAuthor,
         image_url: imageurl,
         user_url: userurl,
         desc: portfoliosDesc
         //above is the model variables getting data from the input dields with these tags
       },
       success: function(data){
         console.log(data);
         alert('File upated sucessfully');
       }, //success
       error: function(){
         console.log('error: cannot update portfolio');
       } //error
     })//ajax
   }//if
 })//end
   // <--! function for updating portfolios ends here  !-->

}) // <--! document ready code ends here -->
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
