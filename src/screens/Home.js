import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const [search,setSearch]=useState([]);
  const [foodCat,setFoodCat]=useState([]);
  const [foodItem,setFoodItem]=useState([]);
  const loadData = async ()=>{
      
    let response =await fetch("http://localhost:5000/api/foodData",{
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
        }
    });

    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])
    //console.log(response[0],response[1])
  }

  useEffect(()=>{
    loadData()
  },[])






  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{objectFit:"contain important"}}>
            <div className="carousel-inner" id="carousal" >
                <div className="carousel-item active">
                <img src="https://i.pinimg.com/originals/5a/c7/34/5ac7346f08e49a2d6419805ab069516d.jpg" className="d-block w-100" style={{filter: "brightness(60%)"}}/>
                </div>
                <div className="carousel-item">
                <img src="https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=" className="d-block w-100" style={{filter: "brightness(60%)"}}/>
                </div>
                <div className="carousel-item">
                <img src="https://media.istockphoto.com/photos/king-fish-biryani-with-raita-served-in-a-golden-dish-isolated-on-dark-picture-id1409942571?b=1&k=20&m=1409942571&s=170667a&w=0&h=ozlMJf5hsDmS2sSdEdBWnoSZOEITef4qGMeWeq2lyTc=" className="w-100"  style={{filter: "brightness(60%)"}}/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div classNameName='carousel-caption ' >
                    <div className="d-flex m-3 justify-content-center ">
                        <button className="btn btn-outline-success text-white bg-success" style={{'margin-right': '10px'}} ><SearchIcon/></button>
                        <input className="form-control " type="search" placeholder="Search"  aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                    </div>
        </div>
      </div>
      <div className='container'>
          {
            foodCat!==[]
            ? foodCat.map((data)=>{
              return(
                 <div className='row mb-3'>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== []
                    ?foodItem.filter((item)=> (item.CategoryName===data.CategoryName) &&(String(item.name).toLowerCase().includes(String(search).toLowerCase())))
                    .map(filterItems=>{ 
                      return(
                        <div key={filterItems._id} className='col-9 col-md-6 col-lg-3 mt-1' >
                          <Card foodItems={filterItems}
                            options={filterItems.options[0]}
                            
                          ></Card>
                        </div>
                      )
                    }
                    ): <div>No Such Data Found</div>
                  }
                 </div>
              )
            })
            :<div>No Such Data Found</div>
          }
      </div>
      <div><Footer /></div>
    </div>
  )
}