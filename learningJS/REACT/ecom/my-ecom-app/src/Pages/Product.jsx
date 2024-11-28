import React,{useEffect, useState} from 'react' 
import ProductCard from '../components/ProductCard';

const Product = () => {
    const [products,setProducts]=useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [errorMessage, setErrorMessage]=useState('');

    useEffect(()=>{
        const fetchProducts=async()=>{
            try{
                const response=await fetch('https://fakestoreapi.com/products/')
                const data=await response.json();
                setProducts(data);
                setIsLoading(false);
            } catch (error){
                console.error('Error fetching Data:', error);
                setErrorMessage('Failed to load products.')
                setIsLoading(false);
            }
        };
    fetchProducts();
    },[]);
    
    return (
        <div className='product-list'>
            {isLoading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}
            {!isLoading && !errorMessage && products.map((product)=>(
                <ProductCard
                    key={product.id}
                    name={product.title}
                    price={`$${product.price}`}
                    image={product.image}
                />
            ))}
        </div>
    );
};
export default Product
