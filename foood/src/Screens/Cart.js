import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart, useDispatch } from "../Components/ContextReducer";

function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">Cart is empty</div>
      </div>
    );
  }

  const handlecheckout = async () => {
    let useremail = localStorage.getItem("useremail");
    //console.log("here...."+useremail)//line1
    try {
      let response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: useremail,
          order_data: data, // Ensure that useremail is not empty
          order_date: new Date().toDateString(),
        })
      });
  
      console.log("order_response", response.status);
  
      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        console.error("Request failed with status:", response.status);
        // Additional error handling or user feedback can be added here
      }
    } catch (error) {
      console.error("Network error:", error.message);
      // Additional error handling or user feedback can be added here
    }
  };
  

  let totalprice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md ">
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr>
              <td scope="row">{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => dispatch({ type: "REMOVE", index: index })}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>
          <h1 className="fs-2">Total Price : {totalprice}</h1>
        </div>
        <button className="btn bg-success mt-5" onClick={handlecheckout}>
          Check Out
        </button>
      </div>
    </div>
  );
}

export default Cart;
