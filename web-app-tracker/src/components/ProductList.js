function ProductList(props) {

    if (props.error) return (<div>Error!</div>);
    
    if (props.products) {
        return (
            <div>
            <h1>Products</h1>
            {props.products.map((product) => (
                <div key={product.productId}>
                <h2>{product.productName}</h2>
                <p>{product.productOwnerName}</p>
                </div>
            ))}
            </div>
        );
      } else {
        return (
          <div>
            <h1>Loading...</h1>
          </div>
        );
      }
}

export default ProductList;