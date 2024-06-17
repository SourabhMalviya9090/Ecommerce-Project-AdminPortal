import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from "../../assets/upload_area.svg"

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [product, setproductDetails] = useState({
    name: "",
    image: "",
    new_price: "",
    old_price: "",
    category: ""
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const chnageHandler = (e) => {
    setproductDetails({ ...product, [e.target.name]: e.target.value });
  }

  // function for adding product to database
  const AddproductToBackend = async () => {
    let responseData;
    let productDetails = product;
    let formdata = new FormData();
    formdata.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formdata
    }).then((res) => res.json()).then((data) => {
      responseData = data;
    })

    if (responseData.success) {
      productDetails.image = responseData.image_url;
      console.log(productDetails);
    }

    await fetch('http://localhost:4000/addproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productDetails)
    }).then((res) => res.json()).then((data) => {
      data.success ? alert(`${data.product.name} is added successfully!`) : alert("Failed!");
    })

  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input onChange={chnageHandler} value={product.name} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input onChange={chnageHandler} value={product.old_price} type="number" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input onChange={chnageHandler} value={product.new_price} type="number" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select onChange={chnageHandler} value={product.category} name="category" id="category" className='add-product-selector'>
          <option value="women" selected >Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image != false ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumbnail-img' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={AddproductToBackend} className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default Addproduct
