import React, {useContext, useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ClothesList from "../components/ClothesList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchClothes1, fetchTypes} from "../http/clothesAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {clothes} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => clothes.setTypes(data))
        fetchBrands().then(data => clothes.setBrands(data))
        fetchClothes1(null, null, 1, 8).then(data => {
            clothes.setClothes1(data.rows)
            clothes.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchClothes1(clothes.selectedType.id, clothes.selectedBrand.id, clothes.page, 8).then(data => {
            clothes.setClothes1(data.rows)
            clothes.setTotalCount(data.count)
        })
    }, [clothes.page, clothes.selectedType, clothes.selectedBrand,])

    return (
        <Container>
            <Row >
                <Col md={3} className="mt-3" style={{border: '1px solid lightgray'}}>
                    <h4 className="mt-2">Сортировка</h4>
                    <hr/>
                    <h4 className="mt-2">Типы</h4>
                    <TypeBar/>
                    <hr/>
                    <h4 className="mt-2">Бренды</h4>
                    <BrandBar className="mb-5"/>
                </Col>
                <Col md={9} >

                    <ClothesList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
