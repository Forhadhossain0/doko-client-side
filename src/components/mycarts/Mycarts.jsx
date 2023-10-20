import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2'


const Mycarts = () => {
  const getData = useLoaderData();
  console.log(getData)
  
  const [product,setProduct] = useState(getData);

const handleDeleteProduct = (_id) =>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
 .then( result => {
    if (result.isConfirmed) { 
      fetch(`https://backend-server-8qgd4pfvx-forhads-projects.vercel.app/products/${_id}` , {method:'DELETE', } )
     .then(res=> res.json())
     .then(data => {
        if(data.deletedCount > 0){
            Swal.fire(
              'Deleted!',
              'Your coffee has been deleted.',
              'success'
            )}
        const remaining = product.filter(x  => x._id !== _id);
        setProduct(remaining)
    })
}})

}




  return (
    <div>
      <h2 className="my-12 ml-10 text-left text-3xl font-bold">Your Added products Total : <span className=" text-4xl text-green-600">{product.length}</span></h2>

      <div className="md:grid grid-cols-2 mx-auto bg-base-200 py-10  ">
      { product.map(product => (     
        <div key={product._id} className=" md:w-[550px] shadow h-36 rounded mx-10 md:mx-auto  p-5   ">
           <div className=" flex text-left justify-between items-center rounded-md ">
            <img className="rounded-xl bg-slate-200 w-20 h-20" src={product.photo}  alt=""  />
            <p className="text-left"><span className="font-bold  text-green-600">{product.name}</span> <br /> <span>{product.brandname}</span> </p>
            <p className="font-bold text-left text-green-400" >${product.price}</p>
            <button onClick={()=> handleDeleteProduct(product._id)} className="text-2xl hover:text-red-500 mr-2">X</button>
            </div>
        </div>
        
        ))}

    </div>

    </div>
  );
};

export default Mycarts;
