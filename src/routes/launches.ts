import express from "express"
import { getLaunchStatus } from "../utils/status"
import { calculateCost } from "../utils/pricing"
import {prisma} from "../prisma"
import { AuthRequest, auth } from "../middleware/auth"

const router = express.Router();

router.post("/launches", auth, async(req: AuthRequest, res) => {
    const {
        name,
        Symbol, 
        totalSupply, 
        pricePerToken,
        startAt, 
        endAt,
        maxPerWallet, 
        description
    } = req.body;

    if(!name || !Symbol) {
        return res.status(401).json({ msg: "Missing fields"})
    }

    const launch = await prisma.launch.create({
        data: {
            name,
            Symbol,
            totalSupply,
            pricePerToken,
            startAt: new Date(startAt),
            endAt: new Date(endAt),
            maxPerWallet,
            description,
            creatorId: req.user.id
        }
    })

    res.status(201).json({msg: "Token launch on chain successfully"})

})

router.get("", async (req, res) => {
    const launches = await prisma.launch.findMany({
        include : {purchases: true}
    })
    //Calculate Total Purchased Tokens
      const result = launches.map(l => {
    const purchased = l.purchases.reduce(
            (a,p) => a + p.amount,
            0
        )
        return {
            ...l,
            status: getLaunchStatus(l, purchased)
        }
      })

      res.json(result)


})

export default router
