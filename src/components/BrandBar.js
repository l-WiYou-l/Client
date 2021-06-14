import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const BrandBar = observer(() => {
    const {clothes} = useContext(Context)

    return (
        <ListGroup>
            {clothes.brands.map(brand =>
                <ListGroup.Item
                    action variant="secondary"
                    style={{cursor: 'pointer'}}
                    active={brand.id === clothes.selectedBrand.id}
                    onClick={() => clothes.setSelectedBrand(brand)}
                    key={brand.id}
                >
                    {brand.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default BrandBar;
