
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Nitesh:Niteshpassword@cluster0.xs7rh.mongodb.net/amazonclone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true});

mongoose.set('useNewUrlParser', true);

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
/*app.get("/temp",(req,res)=>{
console.log("/temp");
let one={
 name:"Louis Vuitton Shirt",
seller:"6076ae8e7ac242888b13a2ae",
category:"Shirts",
image:"/images/pl2.jpg",
price:190,countInStock:9,brand:"Louis Vuitton",
rating:4,numReviews:190,description:"Comfortable Shirts",
reviews:[] }
let prod=new User(one);
console.log(prod);

prod.save(function(error, user){
   console.log("err exa ",error);
res.send(prod._id);
});

});*/
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}${process.env.MONGODB_URL}`);
});
