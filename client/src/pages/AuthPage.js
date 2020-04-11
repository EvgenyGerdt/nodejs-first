import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {Link} from "react-router-dom";

function handleClick() {
    window.location.href('/register')
}

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm]  = useState({
        email: '', password: ''
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

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="row">
            <div className="container"><div className="background_block"></div></div>
            <div className="col s4 offset-s4">
                <div className="card white">
                    <div className="card-content black-text">
                        <h5 className="auth_h">Яндекс.Разработчик</h5>
                        <p className="auth_p">Войдите, чтобы продолжить</p>
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
                        </div>
                    </div>
                    <div className="container card-action">
                        <div className="row">
                            <button
                                className="btn yellow darken-1 black-text z-depth-0 col s12"
                                id="card-btn"
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Войти
                            </button>
                            <button
                                className="btn white accent-4 black-text z-depth-0 col s12"
                                id="card-btn"
                                disabled={loading}
                                onClick={registerHandler}
                            >
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}