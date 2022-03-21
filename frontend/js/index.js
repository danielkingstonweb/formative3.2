console.log('i am linked');

$(document).ready(function(){
    let url;

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
          <div class="card">
          <div class="card__img">
            <img class="card-img" src="${portfoliosfromMongo[i].image_url}" class="card-img-top" alt="...">
           </div> 
            <div class="card-body">
            <h5 class="card-title">${portfoliosfromMongo[i].name}</h5>
            <p class="card-text">| ${portfoliosfromMongo[i].author}</p>
            <a href="${portfoliosfromMongo[i].user_url}" target=”_blank” class="btn btn-primary btn-card">Visit the website</a>
            </div>
        </div>
          `
  
      }
      //above is the append for the cards. this is just a template to be used to create the cards, providing the designer with the right tags.
      //note - do not add comments between the backticks, they will shwo up in the HTML. 
  }, 
  error:function(){
    console.log('unable to load portfolios');
  }
  
  })


//add a product
$('#addaPortfolio').click(function(){
  event.preventDefault();
  let name = $('#portfolioName').val();
  let author = $('#portfolioAuthor').val();  
  let image_url = $('#portfolioImageurl').val();
  let user_url = $('#portfolioUAerurl').val();
  let desc = $('#portfolioDesc').val();  

  console.log(name,author, image_url, user_url, desc);
  if (name == '' || author == '' || image_url == '' || user_url == ''|| desc == ''){
    alert('Please enter all details');
  } else {
    $.ajax({
      url : `http://${url}/addPortfolios`,
      type : 'POST',
      data :{
        name: name,
        author: author,
        image_url:image_url,
        user_url: user_url,
        desc: desc
      },
      success : function(portfolios){
        console.log(portfolios);
        alert ('Project added');
      },
      error : function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//else
});//addProject

  }

function projectOfTheDay(){
      
}

// <--! function for deleting portfolios starts here  !-->
$('#deleteaPortfolio').click(function(){
  //above is the id tag for the delete button
  event.preventDefault();
  let portfoliosId = $('#deletePortfolioInput').val();
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
        alert('Project Deleted Sucessfully');
      }, //success
      error:function(){
        console.log('error: cannot call api');
      }//error
    })//ajax
  }//if
})//end
 // <--! function for deleting portfolios ends here  !-->
 
// <--! function for updating portfolios starts here  !-->
$('#editPortfolio').click(function(){
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
