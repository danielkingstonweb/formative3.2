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
        document.getElementById('cardContainer').innerHTML = "";
  
        for(i=0;i<portfoliosfromMongo.length;i++){
          document.getElementById('cardContainer').innerHTML +=
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
  }



})// document.ready function ends here