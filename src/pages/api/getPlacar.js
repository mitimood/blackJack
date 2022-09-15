import clientPromise from "../../../lib/mongodb"
import Router from 'next/router'
import querystring from 'node:querystring';


export default async function handler(req, res) {

    return new Promise(async (resP,rejP)=>{

        function compare( a, b ) {
            if ( a.session.points < b.session.points ){
              return -1;
            }
            if ( a.session.points > b.session.points ){
              return 1;
            }
            return 0;
        }

        const session = req.query.session

        const userId = req.query.userId

        const clientMong = await clientPromise

        const sessoes = clientMong.db('blackjack').collection('sessoes')
        
        const docs = await sessoes.find({ "session.sessionName": session })?.toArray()

        docs.sort(compare).reverse()

        let resultApproved = []
        let resultReproved = []

        docs.forEach((d,i)=>{
            if(d.session.points > 21){
                resultReproved.push(d)
            }else{
                resultApproved.push(d)
            }

        })


        resultReproved.reverse()

        resultApproved = resultApproved.concat(resultReproved)
        
        res.status(200)

        resP(res.send(resultApproved))  
        
        })

}


// ID Usuario gerado auto como chave e sessão como status contendo  os pontos
// Validar pela sessao