import axios from "axios"
import data from "../data/data.js";
export const addData = async (req, res) => {

  axios({
    method: "get",
    url: `${process.env.PRODUCT_URL}/remove`,
  }).then(async (Response) => {
    console.log(Response.data);
  });

  axios({
    method: "get",
    url: "https://fakestoreapi.com/products",
  }).then(async (Response) => {
    // const createdProducts = await Product.insertMany(res.data)
    // fs.writeFileSync('data2.json',`${res.json()}`, function(err) {console.log(err);})
    console.log(Response.data);
  });

   axios({
     method: "get",
     url: `${process.env.USER_URL}/removeusers`,
   }).then(async (Response) => {
     console.log(Response.data);
   });
  

   const createdProducts =  axios({
     method: "get",
     url: `${process.env.PRODUCT_URL}/insert`,
     headers: {
       "content-type": "application/json",
     },
     data: [
       {
         product: data.products,
       },
     ],
   }).then(async (Response) => {
     return Response.data
   });

  
  const createdUsers =  axios({
     method: "get",
     url: `${process.env.USER_URL}/insert`,
     headers: {
       "content-type": "application/json",
     },
     data: [
       {
         users: data.products,
       },
     ],
   }).then(async (Response) => {
     return Response.data;
   });
  res.send({ createdProducts, createdUsers });

     res.send({ createdProducts, createdUsers });
};
