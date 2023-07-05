import { Button } from 'bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
   let dispatch = useDispatchCart();
   let data=useCart();
  let options =props.options;
  let priceOptions=Object.keys(options)
  const priceRef=useRef();
  const [qty,setQty]=useState(1)
  const [size,setSize]=useState("")

  const handleAddCart=async ()=>{
    
    await dispatch({type:"ADD",id:props.foodItems._id,name:props.foodItems.name,qty:qty,size:size,price:finalPrice,img:props.foodItems.img})
    console.log(data)
  } 
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[] )
  return (
    <div>
        <div className="card" style={{"width": "16rem","maxHeight":"360px" }}>
        <img src={props.foodItems.img} className='card-img-top' alt="..." style={{height:"120px",objectFit:"fill"}} />
        <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            <div className='container w-100'>
            <select className='m-2 h-100  bg-success' onChange={(e)=> setQty(e.target.value)}>
                {Array.from(Array(6),(e,i)=>{
                return (
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
                })}
            </select>
            <select className='m-2 h-100  bg-success' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
               {
                  priceOptions.map((data)=>{
                    return <option key={data} value={data}>{data}</option>
                    })
                }
            </select>
            <div className='d-inline h-100 fs-5'>
                {finalPrice}/-
            </div>
            </div>
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddCart}>Add to Cart</button>
        </div>
        </div>
    </div>
    
  )
}