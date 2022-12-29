import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const deleteDB = async() => {
    try{
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
    } catch (e) { throw new Error("Database deletion failed"); }
}
const postDB = async({name, subject, score}) => {
    if(score=='')return;
    var card = await ScoreCard.deleteMany({'name':name, 'subject':subject})
    try{
        const newScoreCard = new ScoreCard({name, subject, score});
        console.log('created/modified Scorecard:', newScoreCard);
        newScoreCard.save();
    }catch(e){throw new error(e);}
    return {message:`Adding (${name}, ${subject}, ${score}) ${card}`, card:card};
}
const getDB = async({type, queryString}) => {
    const x = await ScoreCard.find({[type]:queryString}, {name:1, subject:1, score:1, _id:0});
    return x;
}

const router = Router();
router.delete("/cards", (_, res) => {deleteDB();res.json({message:'Database cleared'})});
router.post("/card", (req, res) => {postDB(req.body);res.json({message:req.body.score===''?'invalid input':`Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`, card:req.body.score!==''});});
router.get("/cards", async(req,res) => {var result = await getDB(req.query);
    var msg = [`Found card with ${req.query.type}:`]
    result.map((i) => {msg.push(`\n(${i.name}, ${i.subject}, ${i.score})`)})
    if (result == 0) msg = false
    res.json({messages:msg, message:`${req.query.type} (${req.query.queryString}) not found!`})
});
export default router;


//router.post("/card", (req, res) => {postDB(req.body);res.json({message:'hello',card:true});});