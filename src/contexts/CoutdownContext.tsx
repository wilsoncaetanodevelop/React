import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CoutdownContextData{

    minutes: number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}


interface CoutdownProviderProps{
    children: ReactNode;
}

export const CoutdownContext = createContext({} as CoutdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CoutdownProvider({children}: CoutdownProviderProps){

    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(5 * 60);
    const [ isActive,setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;


    function startCountdown (){
        setIsActive(true);
    } 

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(5 * 60);
    }

    useEffect(()=>{
        if(isActive && time > 0 ){
            countdownTimeout = setTimeout(()=>{
                setTime(time-1);
            }, 1000)
        }else if(isActive && time == 0){
           setHasFinished(true);
           setIsActive(false);
           startNewChallenge();
        }
    },[ isActive, time])


    return(
        <CoutdownContext.Provider value={{
           minutes,
           seconds,
           hasFinished,
           isActive,
           startCountdown,
           resetCountdown,

        }}>
            {children}
        </CoutdownContext.Provider>
    )
}