import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import {ProfilePage} from "./pages/ProfilePage"
import {AuthPage} from "./pages/AuthPage"
import {RegisterPage} from "./pages/RegisterPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/profile/:id">
                    <ProfilePage />
                </Route>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/register">
                <RegisterPage />
            </Route>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}