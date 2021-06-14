import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Image} from "react-bootstrap";
import {createBrand, createType, fetchAllOrder, fetchAllProducts} from "../../http/clothesAPI";
import order from "../../store/ClothesStore";
import {Context} from "../../index";
import {$host} from "../../http";

const CreateBrand = ({show, onHide}) => {
    const [state, setState] = React.useState({
        orders: [],
        products: []
    });
    React.useEffect(() => {
        ( async () => {
            const orders = (await fetchAllOrder()); // тут мы получаем все товары.
            const products = (await fetchAllProducts()).rows; // тут мы получаем все товары.
            console.log('order', orders)

            setState({
                ...state,
                orders,
                products
            })
        })()
    },[]);
    const userData = JSON.parse(localStorage.getItem('user'))
    const deleteOneOrder = async (id) => {
        const {data} = await $host.delete('api/order/' + id)

        const orders = state.orders.filter((o)=> o.id !== id )
        console.log('order', orders)
        setState({ ...state, orders })
        return data
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Заказы
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {state.orders.map( (o) => {

                    return (
                        <div>
                            {
                                o.products.map((p) => {

                                    const product = state.products.find((fp) => fp.id === p.productId)

                                    return(
                                        <div className="d-flex">
                                            <div><Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/></div>
                                            <div className="pb-3">
                                                <div>Название: {product.name} </div>
                                                <div>Цена: {product.price}</div>
                                                <div>Адрес: {userData.address}</div>
                                                <div>Mail: {userData.email}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div>
                                <Button className="mr-2" variant="outline-danger" onClick={() => deleteOneOrder(o.id)}>Удалить</Button>
                            </div>
                        </div>
                    )
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>

            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;
