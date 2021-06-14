import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Card, Col, Image} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'




const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.clear('token')
        localStorage.clear('user')
        history.push(SHOP_ROUTE)
    }
    const userData = JSON.parse(localStorage.getItem('user'))
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white', textDecoration: 'none'}} to={SHOP_ROUTE}>ClothesShop</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(BASKET_ROUTE)}
                        >
                            <Col xs={6} md={4}>
                                <Image width={25} height={25} src="https://img-premium.flaticon.com/png/512/34/34627.png?token=exp=1623322524~hmac=82bf8ca8fa9efea9cf3082fc486f052e" rounded />
                            </Col>
                        </Button>
                        {userData.role === "ADMIN" ?
                            <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                            className="ml-2"
                        >
                            Админ панель
                        </Button>
                            :
                            <div></div>
                        }
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
