import React from "react";
import {ReactStateDeclaration} from "@uirouter/react";

export default function Home (){
    return (
        <h1>hello brother Home</h1>
    );
}

export const states: ReactStateDeclaration[] = [
    {
        name: "home",
        url: "/home",
        component: Home
    }
];
