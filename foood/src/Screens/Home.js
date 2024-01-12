import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Carousel from "../Components/Carousel";

function Home() {
  const [search,sets]=useState("")
  const [foodCat, setcat] = useState([]);
  const [foodItem, setitem] = useState({});

  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setitem(response[0]);
    setcat(response[1]);
    //console.log(response[0],response[1]);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div>
      <Header />
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    <div className="carousel-inner" id='idd'>
    <div  classN ame='carousel-caption' style={{zIndex:"10"}}>
    <div class="d-flex justify-content-center">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>sets(e.target.value)}/>
        {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
      </div>
    </div>
      <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="Random Burger" />
  
            </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900×700/?cake" className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900×700/?biryani" className="d-block w-100" alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
      </div>
      <div className="container">
     
      {foodCat !== []
  ? foodCat.map((data) => {
      const filteredItems = foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()));
      return (
        <div key={data._id} className="row mb-3">
          <div className="fs-3 m-3">{data.CategoryName}</div>
          <hr />
          {filteredItems.length !== 0 ? (
            filteredItems.map((filterItem) => (
              <div key={filterItem._id} className="col 12 col-md-6 col-lg-3">
                <Card foodItem={filterItem}
                options={filterItem.options[0]}
                
                ></Card>
              </div>
            ))
          ) : (
           ""
          )}
        </div>
      );
    })
  : ""}


       
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
