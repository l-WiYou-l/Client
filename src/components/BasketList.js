import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ClothesItem from "./ClothesItem";
import BasketItem from "./BasketItem";

const BasketList =(props) => {
    return (
 <div>
            {   props.cartProducts.map(item =>
                <BasketItem key={item.id} item={item}  addCont={props.addCount} removeCount={props.removeCount}/>
            )}
 </div>
    );
};

export default BasketList;
