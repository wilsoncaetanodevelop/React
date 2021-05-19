import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CoutdownContext } from '../contexts/CoutdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

    
export function ChallengeBox(){

    const {activeChallenge, resetChallenge, completeChallange} = useContext(ChallengesContext);
    const { resetCountdown} = useContext(CoutdownContext);

    function handleChallengeSucceeded(){
        completeChallange();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
           {activeChallenge ? (
               <div className={styles.challengeActive} >

                <header>Ganhe {activeChallenge.amount} xp</header>

                <main>
                    <img src='icons/foguete.png' alt="level Foguete"/>
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>

                </main>

                <footer>

                    <button 
                    type="button"
                    className={styles.challengeFailedButton}
                    onClick={handleChallengeFailed}
                    >
                        Falhei
                    </button>
                    <button 
                    type="button"
                    className={styles.challengeSucceededButton}
                    onClick={handleChallengeSucceeded}
                    >
                        Completei
                    </button>

                </footer>

               </div>

           ): (
            <div className={styles.challengeNotActive}>
                <strong> Finalize um ciclo para receber um desafio</strong>
                <p>
                    
                    <img src="icons/envio-upp.png" alt="level"/>
                    Avance de level completando desafios.
                </p>
            </div>
           )}
        </div>
    )
}