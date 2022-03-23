console.log('i am linked');

// let portfolioData = [];
// console.log(portfolioData);

$(document).ready(function(){
    let url;
// <--! Ajax Function Sarts here !-->
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

    


    // MODAL FUNCTION BEGINS

    function modalAddProject(){
      // Card modal section Begins

      $("#addPortfolioBtn").click(function(){
          console.log('heyModal');
               $("#modalHeader").empty().append(
                 `
                 <h5 class="modal-title" id="exampleModalLabel">Add a Project</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                 `
               )

               $("#modalBody").empty().append(
                `
                <form class="modal-body__add">


                  <div class="modal-body__left">
                    <!-- <label for='portfolioName'> Enter name: </label> -->
                    <input class="add-project__name modal-field__add" type="text" id='portfolioName' placeholder="Enter Project Name"> 
                    <!-- this is the correct ID for name input for addPortfolios -->
                    <br><br>

                <!-- <label  for='portfolioImageurl'> Enter the image url </label> -->
                  <!-- this is the correct ID for image_url input for addPortfolios -->
                <input class="add-project__img modal-field__add" type="text" id='portfolioImageurl' placeholder="Enter Image Url">
                <br><br>
              </div>
                
              <div class="modal-body__right">
              <!-- <label for='portfolioName'> Enter name: </label> -->
              <input class="add-project__name modal-field__add" type="text" id='portfolioName' placeholder="Enter Project Name"> 
              <!-- this is the correct ID for name input for addPortfolios -->
              <br><br>
                    <!-- <label for='portfolioAuthor'> Enter Author: </label> -->
                    <input class="add-project__author modal-field__add" type="text" id='portfolioAuthor' placeholder="Enter Project Author">
                      <!-- this is the correct ID for author input for addPortfolios -->
                    <br><br>

                  <!-- <label  for='portfolioDesc'> Enter Description: </label> -->
                    <!-- this is the correct ID for desc input for addPortfolios -->
                  <input class="add-project__desc modal-field__add" type="text" id='portfolioDesc' placeholder="Enter Project Description">
                  <br><br>
            
        
    
        
                  <!-- <label class="mr-5" for='portfolioUserurl'> Enter the user url </label> -->
                  <input class="add-project__link modal-field__add" type="text" id='portfolioUserurl' placeholder="Link to Project Details">
                    <!-- this is the correct ID for user_url input for addPortfolios -->
                  <br><br>
                  </div>      
                    <!-- this button has the correct ID for running the addPortfolios function-->
                    <div class="img-preview" id="imgPreview">
                    <p class="img-preview__txt">When you add your image a preview will show up here.</p>
                    </div>

                    <div class"add-img__div">

                      <input class="add-project__img modal-field__add" type="text"id='portfolioImageurl' placeholder="Enter Image Url">
                    
                      <button target="#" class="add-img__btn" id="addImgToModal">+</button>

                    </div>
                
                  </div>
                
                  <div class="modal-body__right">

                  
                  <input class="add-project__author modal-field__add" type="text" id='portfolioAuthor' placeholder="Enter Project Author">
                    <!-- this is the correct ID for author input for addPortfolios -->
                  <br><br>


                  <textarea class="add-project__desc modal-field__add" type="text" id='portfolioDesc' placeholder="Enter Project Description"></textarea>
                  <br><br>
               
    
              


                </form>
                `
              )

              $("#modalFooter").empty().append(
                `
                <button id="addaPortfolio" type="submit" >Add portfolio</button>
                
                `
              )

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


            // Image preview function begins
            function imagePreview(){

              // let imageUrl = $('#portfolioImageurl').data('value');
              let imageUrl = $('#portfolioImageurl').val();
              $('#portfolioImageurl').change(function(){
                console.log(imageUrl);
                $("#imgPreview").css("background", `red`).css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position-x", "center")
              })

            }

            imagePreview();
          })
// <--! function for deleting portfolios starts here  !-->
          $("#deletePortfolioBtn").click(function(){
            console.log('heyModal');
                 $("#modalHeader").empty().append(
                   `
                   <h5 class="modal-title" id="exampleModalLabel">Delete a Project</h5>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                   `
                 )
  
                 $("#modalBody").empty().append(
                  `
                  <form id="deletePortfolioForm">
                  <h1> Delete a Portfolio</h1>   <br><br>
                  <label for="deletePortfolio"> Delete a Portfolio by ID</label>
                  <input type="text" id="deletePortfolioInput" name="delete-port" >     
                  <br><br>
              
                  <!-- this is the button with the id tag to run the delete function -->
            
                </form>
                  `
                )

                $("#modalFooter").empty().append(
                  `
                  <button id="deleteaPortfolio" name="deleteaPortfolioButton" type="submit">Delete Portfolio</button>
                  `
                )

                
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
            })

            $("#editPortfolioBtn").click(function(){
              console.log('heyModal');
                   $("#modalHeader").empty().append(
                     `
                     <h5 class="modal-title" id="exampleModalLabel">Edit a Project</h5>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                     `
                   )
    
                   $("#modalBody").empty().append(
                    `
                    <form id="updPortfolioForm">
                    <h1> Update a Portfolio</h1>   <br><br>
            
                    <label for='updPortfoliosid'> Insert ID: </label>
                    <input type="text" id='updPortfoliosid'>                
                    <br><br>
            
                    <label for='updPorfoliosname'> Update name: </label>
                    <input type="text" id='updPorfoliosname'>   
                    <br><br>
                
                    <label for='updPortfoliosauthor'> Update Author: </label>
                    <input type="text" id='updPortfoliosauthor'>                     
                    <br><br>
            
                
                     <label  for='updImageurl'> Update the image url: </label>
                    <input type="text"id='updImageurl' >                
                    <br><br>
            
                    <label for='updUserurl'> Update the user url: </label>
                    <input type="text" id='updUserurl'>
                    <br><br>
            
                    <label  for='updPortfoliosdesc'> Update Description: </label>       
                    <input type="text" id='updPortfoliosdesc'>
                    <br><br>

                </form>
                    `
                  )
                  $("#modalFooter").empty().append(
                    `
                        
            <button id="editPortfolio" type="submit" >Edit Portfolio</button>
                    `
                  )

                  $("#modalFooter").empty().append(
                    `
                        
            <button id="editPortfolio" type="submit" >Edit Portfolio</button>
                    `
                  )


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
              })
  

              // cardLoad(url);
      };
  
    // MODAL FUNCTION ENDS

    modalAddProject();




      // <--! function for loading cards starts here  !-->
function cardLoad(url) {
    $.ajax({
      url: `http://${url}/allPortfoliosFromDB`,
      type: 'GET',
      dataType: 'JSON',
      success: function(portfoliosfromMongo){
        console.log(portfoliosfromMongo);

        // portfolioData.push(portfoliosfromMongo);
        let portfolioData = portfoliosfromMongo;
        console.log(portfolioData);


        // Project of the day function begins
        let randomProjectCalc = Math.floor(Math.random() * 26);
        let randomPost = portfolioData[randomProjectCalc];
        console.log(randomPost);
        // Project of the day function ends

        $(".potd__left").css("background", `url(${randomPost.image_url})`).css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position-x", "center")

        $('.potd__right').append(
          `
          <div class="potd__header">
            <div class="potd__header-block">
              <h1 class="potd-header">${randomPost.name}</h1>
              <h2 class="potd-subheader">Today's Showcase</h2>
            </div>
            <p class="potd-author">| ${randomPost.author}</p>
          </div>
          <div class="potd__body">
            <p class="potd-body">${randomPost.desc}</p>
          </div>  
            
          <div class="potd__link">
            <a href="${randomPost.user_url}" class="potd-link">Visit Website</a>
          </div>  
          `
        )


        let i;
  
        //below ID tag 'card_Result' is to match the container where the cards appear
        document.getElementById('cardResult').innerHTML = "";
  
        for(i=0;i<portfoliosfromMongo.length;i++){
          document.getElementById('cardResult').innerHTML +=
          `
          <div class="card card-click" id="${portfoliosfromMongo[i]._id}" data-bs-toggle="modal" data-bs-target="#exampleModal" value="${portfoliosfromMongo[i]._id}">
            <div class="card__img">
              <img class="card-img" src="${portfoliosfromMongo[i].image_url}" class="card-img-top" alt="...">
            </div> 
              <div class="card-body">
              <h5 class="card-title">${portfoliosfromMongo[i].name}</h5>
              <p class="card-text">| ${portfoliosfromMongo[i].author}</p>
              <a href="${portfoliosfromMongo[i].user_url}" target=”_blank” class="btn btn-primary btn-card">See More</a>
              </div>
          </div>
          `

          $(".card-click").click(function(e){
            console.log("heyBro");
            console.log(this.id);
            
            // let portfolioData = portfoliosfromMongo;
            // console.log(portfolioData);
            // let f = 0;
            // for(f = 0; f < portfolioData.length; f++)
            // console.log(portfolioData[f]._id);
              // if(parseInt(this.id) === portfolioData[f]._id){
              //   console.log(portfolioData[f]._id);
              // }
              // modalInfo();

             
              let modalInfo = document.querySelector('.card-click');
              let id = e.target.id;
              console.log(id);

              $.ajax({
                url: `http://${url}/allPortfoliosFromDB/${id}`,
                type: 'GET',
                success: function(modal){
                  console.log(modal);

                  $("#modalHeader").empty().append(
                    `
                    <h5 class="modal-title" id="exampleModalLabel">${modal.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    `
                  )

                  $("#modalBody").empty().append(
                  `
                  <div class="modal__card-body">
                  <div class="modal__body-left"></div>
                  <div class="modal__body-right">
                    <div class="modal__header">
                        <h1 class="modal-name">${modal.name}</h1>
                        <p class="modal-author">| ${modal.author}</p>
                    </div>
                    <div class="modal__desc">
                      <p class="modal-desc">${modal.desc}</p>
                    </div>  
                      
                    <div class="potd__link">
                      <a href="${randomPost.user_url}" class="potd-link">Visit Website</a>
                    </div> 
                  </div>
                  </div>
                  `
                )

                $(".modal__body-left").css("background", `url(${modal.image_url})`).css("background-size", "cover").css("background-repeat", "no-repeat").css("background-position-x", "center")

                $("#modalFooter").empty().append(
                  `
                  <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                  
                  `
                )
                

                }
              })


              
          })

  
      }
      //above is the append for the cards. this is just a template to be used to create the cards, providing the designer with the right tags.
      //note - do not add comments between the backticks, they will shwo up in the HTML. 

 


    }, 
  error:function(){
    console.log('unable to load portfolios');
  }
  
  })


  // modalAddProject();

  }


// function modalInfo(e){
//   let modalInfo = document.querySelector('.card-click');
//   let id = modalInfo.id;
//   console.log(id);

//   $.ajax({
//     url: `http://${url}/allPortfoliosFromDB/${id}`,
//     type: 'GET',
//     success: function(modal){
//       console.log(modal);

//       $("#modalHeader").empty().append(
//         `
//         <h5 class="modal-title" id="exampleModalLabel">${modal.name}</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         `
//       )

//       $("#modalBody").empty().append(
//        `
       
//        `
//      )

//      $("#modalFooter").empty().append(
//        `
//        <button id="addaPortfolio" type="submit" >Add portfolio</button>
       
//        `
//      )
     

//     }
//   })
// }



// <--! function for deleting portfolios starts here  !-->
// $('#deleteaPortfolio').click(function(){
//   //above is the id tag for the delete button
//   event.preventDefault();
//   let portfoliosId = $('#deletePortfolioInput').val();
//   //above is the id for the input that a user types the IDs to be deleted into
//   console.log(portfoliosId);
//   if (portfoliosId == ''){
//     alert('Please enter the portfolio ID to delete the product');
//   } else {
//     $.ajax({
//       url : `http://${url}/deletePortfolios/${portfoliosId}`,
//       type:'DELETE',
//       success : function(){
//         console.log('deleted');
//         alert('Project Deleted Sucessfully');
//       }, //success
//       error:function(){
//         console.log('error: cannot call api');
//       }//error
//     })//ajax
//   }//if
// })//end
 // <--! function for deleting portfolios ends here  !-->
 

 // <--! function for updating portfolios ends here  !-->

}) // <--! document ready code ends here -->
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
