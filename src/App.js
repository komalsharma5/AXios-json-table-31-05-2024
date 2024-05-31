
import React, { useState } from 'react'
import products from './Fake-data'
import ReactPaginate from 'react-paginate'

const App = () => {
  const [data, setData] = useState(products)

  //search
  const [searchProduct, setSearchProduct] = useState("")
  //pagination
  const [pageData, setPageData] = useState(0)

  //price range
  const [priceRange, setPriceRange] = useState([0, 10000]) // default range covering all prices

  const productPage = 10;
  const visitPage = pageData * productPage;
  const displayPage = data.slice(visitPage, visitPage + productPage)

  const countPage = Math.ceil(data.length / productPage);

  const changePage = ({ selected }) => {
    setPageData(selected)
  }

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    if (value === "0-1000") setPriceRange([0, 1000]);
    else if (value === "1001-2000") setPriceRange([1001, 2000]);
    else if (value === "2001-3000") setPriceRange([2001, 3000]);
  }

  const filterProducts = () => {
    const filteredProducts = products.filter((item) =>
      item.price >= priceRange[0] && item.price <= priceRange[1] &&
      (searchProduct === "" || item.category.toLowerCase().includes(searchProduct.toLowerCase()))
    );
    setData(filteredProducts);
    setPageData(0); // Reset to first page after filtering
  }

  return (
    <>
      {/* //serch with category */}
      <div className="container mt-3">
        <div className='row'>
          <div className='col-lg-6'>
            <label>Serach Category :-</label>
            <input type='text' className='ms-5' onChange={(e) => setSearchProduct(e.target.value)} placeholder="I'm looking for..." />
          </div>

          <div className='col-lg-6'>
            <label className='my-2'>Search Product here:</label><br />
            <input type="radio" id="range1" name="priceRange" className='ms-2' value="0-1000" onChange={handlePriceRangeChange} />
            <label htmlFor="range1">0 - 1000</label>
            <input type="radio" id="range2" name="priceRange" value="1001-2000" className='ms-2' onChange={handlePriceRangeChange} />
            <label htmlFor="range2">1001 - 2000</label>
            <input type="radio" id="range3" name="priceRange" value="2001-3000" className='ms-2' onChange={handlePriceRangeChange} />
            <label htmlFor="range3">2001 - 3000</label><br />
            <button className='btn btn-primary my-2' onClick={filterProducts}>Submit</button>
          </div>
        </div>
      </div>

      <div className='container mx-auto d-block'>
        <table className="table table-bordered mt-3 text-center ">
          <thead>
            <tr className='table-info'>
              <th>Id</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {
              displayPage.map((feni) => {
                return <tr key={feni.id}>
                  <td>{feni.id}</td>
                  <td>{feni.title}</td>
                  <td>{feni.category}</td>
                  <td>{feni.price}</td>
                  <td>{feni.rating}</td>
                  <td>{feni.stock}</td>
                  <td>{feni.brand}</td>
                </tr>
              })
            }
          </tbody>
        </table>

        <div>
          <ReactPaginate pageCount={countPage} onPageChange={changePage}
            className="paginationBttns">
          </ReactPaginate>
        </div>
      </div>
    </>
  )
}

export default App