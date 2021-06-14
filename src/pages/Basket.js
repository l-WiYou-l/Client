import React from 'react';
import {useCart} from "../cart";
import {createOrder, fetchAllProducts} from "../http/clothesAPI";
import BasketList from "../components/BasketList";
import {Button, Card} from "react-bootstrap";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";


const Basket = () => {
    const history = useHistory()
    const [state, setState] = React.useState({
        cartProducts: [],
    });
    const { cart, setCart } = useCart();
    React.useEffect(() => {
        ( async () => {
            const products = (await fetchAllProducts()).rows; // тут мы получаем все товары.
            const indexes = Object.keys(cart).map(id => Number(id));

            const cartProducts = indexes.reduce((acc, index) => {
                const foundProduct = products.find(({ id }) => index === id);

                if (foundProduct) return [...acc, { ...foundProduct, count: cart[index].count, price: foundProduct.price }]

                return acc;
            }, []);
            setState({
                ...state,
                cartProducts
            })
        })()
    },[]);

    const getPrice = () => state.cartProducts.reduce((acc, c) => acc + c.price * c.count , 0)

    const userData = JSON.parse(localStorage.getItem('user'))
    const data = {
        userId: userData.id,
        products: state.cartProducts.map( (product)=> ({
            count: product.count,
            productId: product.id
        }))
    }

    const handleAddToCart = (id) => {
        const nCart = setCart(id, '+');
        const count = nCart[id].count;
        const foundIndex = state.cartProducts.findIndex((p) => p.id === id);
        const newCartProducts = [...state.cartProducts];
        newCartProducts.splice(foundIndex, 1, { ...newCartProducts[foundIndex], count });
        setState({ ...state, cartProducts: newCartProducts });

    };
    const handleRemoveToCart= (id) => {
        const nCart = setCart(id, '-');
        const hasItem = !!nCart[id];
        const count = hasItem ? nCart[id].count : 0;
        const foundIndex = state.cartProducts.findIndex((p) => p.id === id);
        const newCartProducts = [...state.cartProducts];
        count > 0
            ? newCartProducts.splice(foundIndex, 1, { ...newCartProducts[foundIndex], count })
            : newCartProducts.splice(foundIndex, 1);
        setState({ ...state, cartProducts: newCartProducts });
    };
    const addOrder = () => {
        createOrder(data).then()
        localStorage.setItem('cart', '')
        history.push(SHOP_ROUTE)
    }
    return (
        <div>
            <div style={{backgroundColor: 'black',display:'grid',gridTemplateColumns: '2fr 8fr 3fr 2fr '}}>
                <div></div>
                <div className="p-3" style={{color: "white"}}>Товар</div>
                <div className=" d-flex justify-content-between" >
                    <div className="p-3 mr-5" style={{color: "white"}}>Количество</div>
                    <div className="p-3 ml-5" style={{color: "white",}}>Цена</div>
                </div>
            </div>
            <BasketList  cartProducts={state.cartProducts} addCount={handleAddToCart} removeCount={handleRemoveToCart}></BasketList>
            <div style={{textAlign:"right", marginRight: "270px"}}><h5>Итого : {getPrice()}</h5></div>
            <Button
                style={{marginLeft: "1510px"}}
                variant={"outline-dark"}
                onClick={addOrder}
            >
                Оформить заказ
            </Button>
        </div>
    );
};

export default Basket;
