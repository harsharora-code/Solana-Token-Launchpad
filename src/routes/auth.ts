import express, { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { prisma } from "../prisma";
import { JWT_SECRET } from "../config";

const router = express.Router();

 router.post("/signup", async (req, res) => {
    const {email, password, username} = req.body;
      if(!email || !password || !username) {
        return res.status(400).json({
            error : "missing values"
            
        })
    }
    const exists = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if (exists) {
    return res.status(401).json({ error: "Duplicate email" })
  }
  const hashed = await bcrypt.hash(password, 10);
  const user  = await prisma.user.create({
    data : {
        email: email,
        password: hashed, 
        username,
    }
  })

  const token = jwt.sign({
    id: user.id, 
  }, JWT_SECRET as string);

  res.status(201).json({
    token,
    user: {
        id: user.id,
        email: user.email,
        username: email.username
    }
  })

});


router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await prisma.user.findUnique({
    where: {email}
  })
  if(!user) {
   return res.status(401).json({msg: "user not found"})
  }
  const valid = await bcrypt.compare(password, user.password);
  if(!valid) {
    return res.status(401).json({msg: "Invalid Crenditails"})
  }
  const token = jwt.sign(
    {id: user.id},
    JWT_SECRET as string
  )
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    }
  })
})
export default Router;
