import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import Placar from '../components/placar'
import styles from '../styles/Home.module.css'
import placarCss from '../styles/placar.module.css'


export default function Home(props) {
    
        return (
        <>
            <Placar users={props.placar}></Placar>
        </>
    )
}


export async function getServerSideProps({query}) {

    const placar = await (await fetch(process.env.SERVER_ADRESS + `/api/getPlacar?session=${query.session}&userId=${query.userId}`)).json()

    return {
      props: {placar}, // will be passed to the page component as props
    }
  }
