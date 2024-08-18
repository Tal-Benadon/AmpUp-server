import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { connect } from './config/db';



connect()

const app = express()
app.use(cors())
app.use(express.json())

// ###### ONLY FOR FAKE DATA
// import go from './mockData/aviad';
// go()
import AuthRouter from './routes/AuthRouter'
app.use('/auth', AuthRouter)


// middleware - token to user
import { verifyToken } from './middleware/auth';
app.use('*', verifyToken)


// ################################################
// ################# ROUTERS ######################
// ################################################
import UserRouter from './routes/UserRouter'
import CoachRouter from './routes/CoachRouter'
import NotificationRoutr from './routes/NotificationRouter'
import FeedBackRouter from './routes/FeedBackRouter'
import ActiveChallengeRouter from './routes/ActiveChallengeRouter'
import ArchiveRouter from './routes/ArchiveRouter';
import ChallengeRouter from './routes/ChallengeRouter';
import LuckRouter from './routes/LuckRouter';
import MediaRouter from './routes/MediaRouter';
import MemberRouter from './routes/MemberRouter';
import StoreRouter from './routes/StoreRouter';
import CoinsRouter from './routes/CoinsRouter'
import RegisterRouter from './routes/RegisterRouter'
import TeamRouter from './routes/TeamRouter'
import ChallengeModel from './coach/router/challengeRouter';

app.use('/user', UserRouter)
app.use('/coach', CoachRouter)
app.use('/activeChallenge', ActiveChallengeRouter)
app.use('/store', StoreRouter)
app.use('/archive', ArchiveRouter)
app.use('/media', MediaRouter)
app.use('/notification', NotificationRoutr)
app.use('/feedback', FeedBackRouter)
app.use('/challenge', ChallengeRouter)
app.use('/luck', LuckRouter)
app.use('/member', MemberRouter)
app.use('/coins', CoinsRouter)
app.use('/register', RegisterRouter)
app.use('/team', TeamRouter)
app.use('/coach/challenge', ChallengeModel)
// ################################################
// ################################################

import tokenTemporary from './test/tokenTemporary';
tokenTemporary.tokenHamudi().then(res => console.log('token: \n \n', res, '\n'))

import './test/scripts'

app.listen(3030, () => console.log("Server is UP : 3030"))