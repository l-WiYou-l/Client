import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useHistory, useParams} from 'react-router-dom'
import {fetchOneClothes} from "../http/clothesAPI";
import {CLOTHES_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {$host} from "../http";
import {useCart} from "../cart";

const ClothesPage = () => {
    const history = useHistory()
    const [clothes, setClothes] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneClothes(id).then(data => setClothes(data))
    }, [])
    const deleteOneClothes = async () => {
        const {data} = await $host.delete('api/clothes/' + clothes.id)
        history.push(SHOP_ROUTE)
        return data
    }
    const { cart, setCart } = useCart();
    const handleAddToCart = (id) => {
        setCart(id, '+');
    };
    const handleRemoveToCart= (id) => {
        setCart(id, '-');
    };
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <Container className="mt-3" className="d-flex flex-column justify-content-around">
            <Row>
                <Col md={8}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + clothes.img}/>
                    <Row className="d-flex flex-column  ">

                    </Row>
                </Col>

                <Col md={3}>
                    <Card
                        className="mt-5 d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h2>{clothes.name}</h2>
                        <h3>Цена: {clothes.price} руб.</h3>
                        <Button variant={"outline-dark"} onClick={ () => handleAddToCart(clothes.id)}>Добавить в карзину</Button>
                        {user.role === "ADMIN" ? <Button variant={"outline-danger"} onClick={ deleteOneClothes }>Удалить товар</Button> :<div></div>}

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Описание</h1>
                    <Row  style={{ padding: 10}}>
                        {clothes.info}
                    </Row>
            </Row>
        </Container>
    );
};

export default ClothesPage;
