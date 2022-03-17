//this file is for testing the document ready fucntions that interxt with the backend (addPortfolios, deletePortfolos, UpdatePortfolios and getAllPortfolios)
//these functions will be copy pasted into the main script when complete
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

console.log('linked');
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
      document.getElementById('card_Result').innerHTML = "";

      for(i=0;i<portfoliosfromMongo.length;i++){
        document.getElementById('card_Result').innerHTML +=
        `
        <div style="background-color:gainsboro">
        <img src="${portfoliosfromMongo[i].image_url}" style="width:200px;height:100px;"><br> 
        <p>${portfoliosfromMongo[i].name}</p><br>
        <p>${portfoliosfromMongo[i].author}</p><br>
        <p>${portfoliosfromMongo[i].desc}</p><br>
        <a href="${portfoliosfromMongo[i].user_url}">Link</a><br>
        </div>
        <br><br>
        `

    }
    //above is the append for the cards. this is just a template to be used to create the cards, providing the designer with the right tags.
    //note - do not add comments between the backticks, they will shwo up in the HTML. 
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
   
    let name = $('#portfolio-name').val(); 
    let author = $('#portfolio-author').val(); 
    let image_url = $('#portfolio-imageurl').val(); 
    let user_url = $('#portfolio-userurl').val(); 
    let desc = $('#portfolio-desc').val(); 
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


}) // <--! document ready code ends here -->
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
