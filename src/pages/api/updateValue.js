import clientPromise from "../../../lib/mongodb"
import Router from 'next/router'

export default async function handler(req, res) {

    return new Promise(async (resP,rejP)=>{

        const userId = req.query.userId
        const value = parseInt(req.query.value)

        const clientMong = await clientPromise

        const sessoes = clientMong.db('blackjack').collection('sessoes')
        
        const doc = await sessoes.updateOne({_id:parseInt(userId)}, {$inc: {"session.points": value} }) 
        
        res.status(200)
        
        resP(res.send(doc))
    })

}


// ID Usuario gerado auto como chave e sessão como status contendo  os pontos
// Validar pela sessao