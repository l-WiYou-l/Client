import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateClothes from "../components/modals/CreateClothes";
import CreateType from "../components/modals/CreateType";
import ShowAdminOrder from "../components/modals/ShowAdminOrder";


const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [clothesVisible, setClothesVisible] = useState(false)
    const [orderVisible, setOrderVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setClothesVisible(true)}
            >
                Добавить одежду
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setOrderVisible(true)}
            >
                Посмотреть заказы
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateClothes show={clothesVisible} onHide={() => setClothesVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <ShowAdminOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
        </Container>
    );
};

export default Admin;
