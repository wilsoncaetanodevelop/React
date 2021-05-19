import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){

    const { currenteExperience, experienceToNextLevel} = useContext(ChallengesContext);

    const percentToNextLevel = Math.round( currenteExperience * 100)/ experienceToNextLevel;
    
     return(
        <header className={styles.experienceBar}>
            <samp>0 xp</samp>
            <div>
                <div style= {{ width: `${percentToNextLevel}%`}}/>

                <samp className={styles.currentExperience} 
                      style={{ marginLeft:`${percentToNextLevel}%`}}> 
                    {currenteExperience}xp
                </samp>
            </div>
            <samp>{experienceToNextLevel} xp</samp>
        </header>
    );
}