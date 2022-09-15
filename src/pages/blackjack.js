import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/blackjack.module.css'
import Cards from "./api/cards.json"


export default function Home(props) {
    const sessionName = props.user.session.sessionName
    const userName = props.user.session.userName
    const sessionTimer = props.user.session.sessionTimer
    const points = props.user.session.points
    const userId = props.user._id
    const cartas = props.cartas

    const [valorCarta, setValorCarta] = useState(0)

    const [valorCartaStr, setValorCartaStr] = useState("0")

    
    const [valorUsuario, setValorUsuario] = useState(points)

    const [timer, setTimer] = useState('')

    // atualiza o valor da pontuaçao de acordo com os registros da db

    useEffect(() => {
        const interval = setInterval(() => {

            let timeDifference = new Date(sessionTimer).valueOf() - new Date().valueOf();

            let minutos = parseInt(timeDifference/(1000*60))
            let segundos = parseInt(timeDifference/(1000))


            if(timeDifference < 0 ){
                Router.push(`/placar?session=${sessionName}&userId=${userId}`)
            }
            if(minutos){
                setTimer(`${minutos}m`)
            }else{
                setTimer(`${segundos}s`)
            }
        
        }, 1000);
        return () => clearInterval(interval);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const fetchNovaCarta = async () => {
        const req = await fetch('http://localhost:3000/api/pegaValorCarta');

        const newData = await req.json();
        const valor = newData.valor

        await fetch(`http://localhost:3000/api/updateValue?value=${valor}&userId=${userId}`);


        setValorUsuario(valorUsuario + newData.valor)

        setValorCartaStr(toString(newData.valor))
        
        return setValorCarta(newData.valor);
    };
    

    const novaCarta = (event) => {
        if(valorUsuario > 21) return

        event.preventDefault();
        fetchNovaCarta();
    };

        return (
        <div className={styles.frame}>
            <h2 className={styles.timer}>BLACK JACK - ⌛{timer}</h2>
            <h2 className={styles.session}>🏠: {sessionName}</h2>
            <h2 className={styles.userName}>{userName}</h2>
            <div className={styles.carta}>
                <Image className= {styles.Image}
                alt="carta"
                objectPosition="center"
                layout="fill"   
                objectFit="cover"
                src={cartas[valorCarta]}/>
                <h3 className={styles.valorCarta}>{valorCarta}</h3>
            </div>
            <h3 className={styles.valorUsuario}>Total {valorUsuario}</h3>
            <div className={styles.botao} onClick={novaCarta}>PROXIMA CARTA</div>
        </div>
    )
}


export async function getServerSideProps({query}) {

    const cartas = Object.values(Cards)
    const user = await (await fetch(process.env.SERVER_ADRESS + "/api/getUser?userId="+ query.id)).json()

    return {
      props: {
        user,
        cartas
        }, // will be passed to the page component as props
    }
  }
