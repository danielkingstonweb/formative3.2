// <--! Global backend constants start here -->
   // Installing packages begins
const express = require('express'); //Includes express js
const app = express(); // Variable for express
const bodyParser = require('body-parser'); // Includes bodyParser
const mongoose = require('mongoose'); // Includes mongoose
const bcrypt = require('bcryptjs'); // Includes bcrypt
const cors = require('cors'); // Includes cors
const config = require('./config.json');
//Database collection variables (product is for testing, user is for stretch goal and portfolios is the one we are using)
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Portfolios = require('./models/portfolios');


// Backend port number
const port = 5000;

// <--! Global backend constants end here -->

// <--! App parser code starts here -->

app.use(bodyParser.json()); // Calling the body parser method
app.use(bodyParser.urlencoded({extended:false})); // Preventing the URL from being parsed

app.use(cors()); // Calling cors method with express

app.get('/', (req,res) => res.send('Hello! I am from the backend baybeeeeee'))

// <--! App parser code ends  here -->

// <--! Mongoose url code starts here -->
mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@teamWork.${config.MONGO_CLUSTER_NAME}.mongodb.net/${config.MONGO_DBNAME}?retryWrites=true&w=majority`, {useNewUrlParser:true,useUnifiedTopology: true}).then(()=>console.log('DB Connected!'))
.catch(err=>{
  console.log(`DB Connection Error:${err.message}`); 
});
// <--! Mongoose url code ends here -->

// <--! port listening code starts here -->
app.listen(port,()=>console.log(`My fullstack application is listening on port ${port}`))
// <--! port listening code ends here -->


// <--! test function code starts here -->
// adding products- for testing purposes only (will be deleted on final commit)
app.post('/addProduct',(req,res)=>{
    const dbProduct = new Product({
      _id: new mongoose.Types.ObjectId,
      name: req.body.name,
      price: req.body.price,
      image_url: req.body.image_url
    });
    // save to database and to notify the user
    dbProduct.save().then(result=>{
      res.send(result);
    }).catch(err=>res.send(err));
  })

// Get all Products for the Database
app.get('/allProductsFromDB',(req,res)=>{
    Product.find().then(result=>{
      res.send(result);
    })
  })

// test function code ends here

// Getting the id for the modals
app.get('/allPortfoliosFromDB/:id',(req,res)=>{
  const id = req.params.id;
  Portfolios.findById(id, function (err, portfolio){
    if (err){
      console.log(err);
    } else {
      console.log("Result : ", portfolio);
      res.send(portfolio)
    }
  })
})
// Getting the id for the modals ends

// <--!add portfolios function code starts here -->
app.post('/addPortfolios',(req,res)=>{
    const dbPortfolios = new Portfolios({
      _id: new mongoose.Types.ObjectId,     
      name : req.body.name,
      author : req.body.author,
      image_url: req.body.image_url,
      user_url: req.body.user_url,
      desc: req.body.desc,
      // this last element called 'desc' is for adding a description to cards if needed, can be removed if not
    });
    // save to database and to notify the user
    dbPortfolios.save().then(result=>{
      res.send(result);
    }).catch(err=>res.send(err));
  })


  
// Get all Portfolios for the Database
app.get('/allPortfoliosFromDB',(req,res)=>{
    Portfolios.find().then(result=>{
      res.send(result);
    })
  })

// <--!add portfolios function code ends here -->

// <--!update portfolios function code starts here -->

//patch is to update the details of the portfolio objects
app.patch('/updatePortfolios/:id',(req,res)=>{
    const idParam = req.params.id;
    Portfolios.findById(idParam,(err,product)=>{
        const updatedPortfolios = {
          name : req.body.name,
          author : req.body.author,
          image_url: req.body.image_url,
          user_url: req.body.user_url,
          desc: req.body.desc,
        }
        Portfolios.updateOne({_id:idParam}, updatedPortfolios).
        then(result=>{
          res.send(result);
        }).catch(err=> res.send(err));
    })
  })

  // <--!update portfolios function code ends here -->

// <--!delete portfolios function code starts here -->
// Delete Portfolios from db
app.delete('/deletePortfolios/:id',(req,res)=>{
    const idParam = req.params.id;
    Portfolios.findOne({_id:idParam}, (err,portfolios)=>{
      if(portfolios){
        Portfolios.deleteOne({_id:idParam},err=>{
          console.log('deleted on backend request');
        });
      } else {
        console.log('not found');
      }
    }).catch(err=> res.send(err));
  });//delete

// <--!delete portfolios function code ends here -->