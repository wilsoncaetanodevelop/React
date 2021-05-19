import React from 'react';
import { GetServerSideProps} from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Coutdown } from '../components/Coutdown';
import { ExperienceBar } from "../components/ExperienceBar"
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CoutdownProvider } from '../contexts/CoutdownContext';
import { ChallengensProvider } from '../contexts/ChallengesContext';


interface HomeProps{
  level:number;
  currenteExperience:number;
  challengesCompleted:number;
}


export default function Home(props: HomeProps ) {

  return (

    <ChallengensProvider
    level={props.level}
    currenteExperience={props.currenteExperience}
    challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>

        <Head>
          <title>Inicio | move.it</title>
        </Head>
      
        <ExperienceBar/>


        <CoutdownProvider>
          <section>

            <div>
              <Profile />
              <CompletedChallenges />
              <Coutdown />
            </div>

            <div>
              <ChallengeBox />

            </div>

          </section>

        </CoutdownProvider>
      </div>
    </ChallengensProvider>


  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{

  const {level,currenteExperience,challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level:Number(level),
      currenteExperience:Number(currenteExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}