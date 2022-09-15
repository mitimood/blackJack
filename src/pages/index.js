import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'


export default function Home() {

  return (
  <>
    <form className={styles.form} action="/api/registraNovoPlayer" method="post">
      <h1 className={styles.blackJack}>BLACK JACK</h1>
      <label className={styles.name} htmlFor="first">Nome:</label>
      <input className={styles.nameCamp} autoComplete='off' required type="text" id="first" name="name" />
      <label className={styles.session} htmlFor="last">Numero do jogo:</label>
      <input onKeyPress={(event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }} className={styles.sessionCamp} autoComplete='off' required type="text" id="last" name="session" />
      <button className={styles.jogar} type="submit">JOGAR</button>
    </form>
  </>

  )
}
