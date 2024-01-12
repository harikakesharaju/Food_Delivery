import React, { useState,useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Myorder() {
  const [orderdata, setorderdata] = useState([]);
  const fetchmyorder=async ()=>{
    console.log(localStorage.getItem("useremail"))
    await fetch("http://localhost:5000/api/myorders",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: localStorage.getItem("useremail") })
        
    }).then(async (res)=>{
        let resp=await res.json();
        //console.log("herrrrrrr "+resp.order_data)
        await setorderdata(resp.order_data);
        //console.log("herrrrrrr "+orderdata[0][1].id)
    })
  }

  useEffect(()=>{
    fetchmyorder()
  },[])
  
  return (
    <div>
      <Header></Header>
      <div>
        <div className="container">
          <div className="row">
          {
//           Array.isArray(orderdata) && orderdata.length !== 0
//   ? orderdata.map((data) => {
//       return orderdata.order_data
//         ? orderdata.
        orderdata
            .slice(0)
            .reverse()
            .map((item) => {
              return item.map((arraydata) => {
                return (
                    
                  <div key={arraydata._id}>
                    {arraydata.order_date ? (
                      <div className="m-auto mt-5">
                        {( arraydata.order_date)}
                        <hr />
                      </div>
                    ) : (
                      <div>
                        <div className='col-12 col-md-6 col-lg-3' key={arraydata._id}>
                          <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                            <img src={arraydata.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                            <div className="card-body">
                              <h5 className="card-title">{arraydata.name}</h5>
                              <div className='container w-100 p-0' style={{ height: "38px" }}>
                                <span className='m-1'>{arraydata.qty}</span>
                                <span className='m-1'>{arraydata.size}</span>
                                <span className='m-1'>{arraydata.date}</span>
                                <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                  ₹{arraydata.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              });
            })
        // : "";
//     })
//   : ""
}


          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Myorder;
