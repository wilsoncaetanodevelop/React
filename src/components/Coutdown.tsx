import { useContext } from 'react';
import styles from '../styles/components/Coutdown.module.css';
 import { CoutdownContext } from '../contexts/CoutdownContext';


export function Coutdown(){

   const { 
     minutes,
     seconds,
     hasFinished,
     isActive,
     startCountdown,
     resetCountdown
    } = useContext(CoutdownContext)

    const [muniteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    return(

        <div>

            <div className={styles.coutdownContainer}>

                <div>
                    <samp>{muniteLeft}</samp>
                    <samp>{minuteRight}</samp>
                </div>
                <span>:</span>
                <div>
                    <samp>{secondLeft}</samp>
                    <samp>{secondRight}</samp>
                </div>

            </div>

            {hasFinished ? (

                <button
                disabled
                className={styles.coutdownButton}
                >
               Ciclo Encerrado
                </button>
                
            ) : (
                <>
                    {isActive ? (

                    <button
                    type="button" 
                    className={styles.coutdownButtonActive}
                    onClick={resetCountdown}
                    >
                    Abandonar  Ciclo
                    </button>
                    ) : (

                    <button
                    type="button" 
                    className={styles.coutdownButton}
                    onClick={startCountdown}
                    >
                    Iniciar um Ciclo
                    </button>
                    ) }     

                </>

            )}

        </div>
    );
}