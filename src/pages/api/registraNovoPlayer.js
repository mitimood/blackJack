import clientPromise from "../../../lib/mongodb"
import Router from 'next/router'

export default async function handler(req, res) {

    return new Promise(async (resP,rejP)=>{

        const clientMong = await clientPromise

        const sessoes = clientMong.db('blackjack').collection('sessoes')
        const controle = clientMong.db('blackjack').collection('controle')
        

        await controle.updateOne({_id:"IdUsuarios"},{$inc:{contador:1}}, {upsert:true})

        const doc = await controle.findOne({_id:"IdUsuarios"}) 
        
        const userId = doc.contador
        const userName = req.body.name
        const sessionName = req.body.session


        const findSessao = await controle.findOne({_id:"sessoesTimer"})
        
        let timer;

        if(findSessao && findSessao[sessionName]){
            timer = findSessao[sessionName]
        }else{
            function addMinutes(date, minutes) {
                return new Date(date.getTime() + minutes*60000);
            }
            timer = addMinutes(new Date(), parseInt(process.env.TIMER_DELAY_MINUTES))


            timer = timer.valueOf()
            

            let insert = {}
            insert[sessionName] = timer

            await controle.updateOne({_id:"sessoesTimer"},{$setOnInsert:{_id:"sessoesTimer"}, $set: insert}, {upsert:true})
        }

    
        await sessoes.insertOne({_id:userId, session: {
            userName: userName,
            points : 0,
            stoped: false,
            sessionName: sessionName,
            sessionTimer: timer
        } 
    })

        resP(
            res.redirect(308,
                `/blackjack?userName=${userName}&id=${userId}&sessaoName=${sessionName}`)
            )
    })

}


// ID Usuario gerado auto como chave e sessão como status contendo  os pontos
// Validar pela sessao