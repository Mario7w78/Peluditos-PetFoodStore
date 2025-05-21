import Footer from "../components/Footer";
import Header from "../components/Header";
import { Title } from "../components/Title";
import { UserRow } from "../components/UserRow";
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from "react";

export function UserList() {

    const { usuarios } = useContext(AuthContext);
    console.log(usuarios);

    return (
        <>

            <Header />

            <Title text="Lista de Usuarios" />

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>DNI</th>
                        <th>Fecha de Nacimiento</th>
                    </tr>
                </thead>

                <tbody>

                    {usuarios.length === 0 ? (
                        <tr>
                            <td colSpan="4">No hay usuarios registrados</td>
                        </tr>
                    ) :
                        usuarios.map((usuario, index) => (
                            <UserRow usuario={usuario} />
                        ))}


                </tbody>

            </table>

            <Footer />


        </>

    )
}