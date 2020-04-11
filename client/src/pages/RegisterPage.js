import React, {useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";

export const RegisterPage = () => {

    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm]  = useState({
        email: '', password: '', firstName: '', secondName: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="container"><div className="background_block"></div></div>
                <div className="col s6 offset-s3">
                    <div className="card white">
                        <div className="card-content black-text">
                            <h5 className="auth_h">Яндекс.Разработчик</h5>
                            <p className="auth_p">Зарегистрируйтесь, чтобы пользоваться нашим компилятором</p>
                            <div className="container">
                                <div className="input-field" id="email_input-field">
                                    <input
                                        id="email"
                                        type="email"
                                        className="validate"
                                        onClick={changeHandler}
                                    />
                                    <label htmlFor="email">Введите почту</label>
                                </div>
                                <div className="input-field" id="password_input-field">
                                    <input
                                        id="password"
                                        type="password"
                                        className="validate"
                                        name="password"
                                        onClick={changeHandler}
                                    />
                                    <label htmlFor="password">Введите пароль</label>
                                </div>
                                <div className="input-field" id="password_input-field">
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="validate"
                                        name="firstName"
                                        onClick={changeHandler}
                                    />
                                    <label htmlFor="firstName">Введите имя</label>
                                </div>
                                <div className="input-field" id="password_input-field">
                                    <input
                                        id="secondName"
                                        type="text"
                                        className="validate"
                                        name="secondName"
                                        onClick={changeHandler}
                                    />
                                    <label htmlFor="secondName">Введите фамилию</label>
                                </div>
                            </div>
                        </div>
                        <div className="container card-action">
                            <div className="row">
                                <button
                                    className="btn yellow darken-1 black-text z-depth-0 s12"
                                    id="card-btn"
                                    onClick={registerHandler}
                                    disabled={loading}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}