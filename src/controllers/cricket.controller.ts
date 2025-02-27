import axios from "axios"
import { Request, Response } from "express"
import { prepareSuccessResponse } from "../utils/responseHandler"
import { AppString } from "../utils/common/AppString"

// LIVE SCORE API
async function _12_9_22_5_45_3_15_18_5(req: Request, res: Response) {
    let key = '9711136c-8499-495c-a365-4c85538db9a2'
    const response = await axios.get('https://cricket.highlightly.net/matches', {
        headers: {
            'x-rapidapi-host': 'cricket-highlights-api.p.rapidapi.com',
            'x-rapidapi-key': key,
        },
        params: {
            date: '2025-02-27', // Add this or another required parameter
            timezone: 'Asia/Kolkata',
            limit: 100,
        },
    });


    // Convert data to a JSON string
    const matchesJson = JSON.stringify(response.data, null, 2);
    res.render('live-scores', { matches: matchesJson })
}

// All Matches API
async function _1_12_12_13_1_20_3_8_5_19(req: Request, res: Response) {
    let CRICKET_API_KEY = process.env['CRICAPI_KEY'] ?? 'your api key'
    const response = await axios.get(`https://67c098fdb9d02a9f224a6042.mockapi.io/api/cricket/all-matches/cricket`, {
        headers: {
            'X-API-KEY': CRICKET_API_KEY
        }
    })

    const data = response.data
    return res.render('live-scores', { data });
}

export default {
    _12_9_22_5_45_3_15_18_5,


    _1_12_12_13_1_20_3_8_5_19
}