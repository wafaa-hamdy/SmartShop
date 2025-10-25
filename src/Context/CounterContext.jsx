import { useState } from "react";
import { createContext } from "react";

export let CounterContext = createContext();



export default function CounterContextProvider (props){
 
    const [counter, setCounter] = useState(0)

    function ChangeCounter(){
        setCounter(Math.random())
    }

    return< CounterContext.Provider value={    {counter,ChangeCounter }    }>
       {props.children}
    </CounterContext.Provider >
}