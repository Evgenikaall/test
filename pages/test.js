import React, {useState, useEffect} from 'react';
import ProductBlock from "../components/ProductBlock";

function Test() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await fetch('http://localhost:8080/api/products', {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <ProductBlock>

        </ProductBlock>
    );
}

export default Test;