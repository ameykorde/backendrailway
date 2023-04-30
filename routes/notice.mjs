import express from 'express'
import { 
    newNotice, 
    getData, 
    deleteNotice, 
    deleteNoticeByTime, 
    updateNotice 
} from '../controllers/notice.mjs'

const router = express.Router()

// Route to get all notice data
router.get('/noticeData', getData)

// Route to create a new notice
router.post('/newNotice', newNotice)

// Route to delete a notice by its id
router.delete('/delete-notice/:id', deleteNotice)

// Route to delete all notices older than a certain time
router.delete('/deleteNotice', deleteNoticeByTime)

// Route to update a notice by its id
router.put('/update-notice/:id', updateNotice)

export default router;
