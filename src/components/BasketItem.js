import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {CLOTHES_ROUTE} from "../utils/consts";
import {useCart} from "../cart";
import {fetchAllOrder, fetchAllProducts} from "../http/clothesAPI";

const BasketItem = (props) => {
    const {item} = props
    const [state, setState] = React.useState({
        carts: [],
    });
    React.useEffect(() => {
        ( async () => {
            const carts = (await localStorage.getItem('cart')); // тут мы получаем все товары.
            setState({
                ...state,
                carts
            })
        })()
    },[]);



    return (
            <div>
                <div className="mt-1 table-bordered" style={{display:'grid', gridTemplateColumns: '1fr 1fr 4fr 1fr 1fr 1fr'}  }>
                    <div></div>
                    <div  >
                        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + item.img}/>

                    </div>
                    <div>{item.name}</div>
                    <div  className="d-flex align-items-center ">
                        <Button  className="mr-1" style={{textAlign:"center"} } onClick={ () => props.removeCount (item.id)}>-</Button>
                        <div  className="mr-1" style={{textAlign:"center"}}>{item.count} шт.</div>
                        <Button  className="mr-1" style={{textAlign:"center"} } onClick={ () => props.addCont(item.id)}>+</Button>
                    </div>
                    <div className="ml-5" style={{textAlign:"center"}} >{item.price * item.count} ₽ </div>
                    <div></div>
                </div>
            </div>
    );
};

export default BasketItem;
