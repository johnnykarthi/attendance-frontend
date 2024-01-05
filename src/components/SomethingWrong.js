import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import SomethingWrongLogo from '../img/error.png';

export default function SomethingWrong() {
    const {owner} = useContext(AuthContext);
    return (
        <div class={!owner ? 'without-login': ''}>
            <div class="something-wrong">
                <img src={SomethingWrongLogo} alt="" width="60%" />
                <p>Somthing went wrong..!</p>
                <button class="btn btn-primary btn-sm">Try Again</button>
            </div>
        </div>
    )
}
