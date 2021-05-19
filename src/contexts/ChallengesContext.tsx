import { createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie'; 
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body';
    description: string;
    amount: number;
}



interface ChallengesContextData{
    level: number; 
    currenteExperience: number; 
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    completeChallange: ()=> void;
    levelUp: ()=> void;
    startNewChallenge: () => void;
    resetChallenge: () =>void;
    closeLevelUpModal: () =>void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level:number;
    currenteExperience:number;
    challengesCompleted:number;
    
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengensProvider({ 
    children,
    ...rest
    }: ChallengesProviderProps){

    const [level, setlevel] = useState(rest.level ?? 1);
    const [currenteExperience, setCurrentExperience] = useState(rest.currenteExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    const[isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

    useEffect(() => {

        Notification.requestPermission();
    },[])


    useEffect(()=>{

        Cookies.set('level', String(level));
        Cookies.set('currenteExperience', String(currenteExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    },[level,currenteExperience,challengesCompleted]);

    function levelUp(){
      setlevel(level + 1);
      setIsLevelModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIdex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIdex];

        setActiveChallenge(challenge);

        new Audio('/stalkerpda.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ',{
                body: 'Valendo ${challenge.amount} xp!'
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallange(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currenteExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
        <ChallengesContext.Provider 
        value={{
            level, 
            currenteExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            activeChallenge,
            completeChallange,
            levelUp,
            startNewChallenge,
            resetChallenge,
            closeLevelUpModal,
            }}
            >
            {children}

            { isLevelUpModalOpen && <LevelUpModal/> }
        </ChallengesContext.Provider>
    )
}