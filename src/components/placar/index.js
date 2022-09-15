import { useState } from "react";
import Link from "next/link";
import styles from '../../styles/placar.module.css'


function Placar(props){
    return(
        <div className={styles.frame}>
            <h1 className={styles.blackJack}>BLACK JACK</h1>
            {props.users.map((o,i)=> 
                <h2 className={styles.entrada} key={i}>{i+1} {o.session.userName} [{o.session.points}]♠</h2> 
                )}
        </div>

    )
}

export default Placar