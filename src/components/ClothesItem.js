import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {CLOTHES_ROUTE} from "../utils/consts";

const ClothesItem = ({clothes}) => {
    const history = useHistory()
    return (
        <Col md={3} className={"mt-3"} onClick={() => history.push(CLOTHES_ROUTE + '/' + clothes.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + clothes.img}/>
                <div style={{textAlign:"center"}}>{clothes.name}</div>
                <div className="mt-2" style={{textAlign:"center"}}>{clothes.price} ₽ </div>
            </Card>
        </Col>
    );
};

export default ClothesItem;
