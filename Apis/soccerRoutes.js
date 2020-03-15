const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {

    const europe = [
        {
            name: "Premier League",
            code: "ENG.1",
            image: 'https://cdn.newsapi.com.au/image/v1/6292af5be30d17d531c97de2c37329a3'
        },
        {
            name: "Spanish Primera División",
            code: "ESP.1",
            image: 'https://en.online-bookmakers.info/assets/manager/la-liga_1.jpg'
        },
        {
            name: "German Bundesliga",
            code: "GER.1",
            image: 'https://sportswhy.com/wp-content/uploads/2019/08/Bundesliga-2019-20-e1565544373456-1280x720.jpg'
        },
        {
            name: "Italian Serie A",
            code: "ITA.1",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLLflBrDG3a1_YuS5k-qvOQITT4BptC6-DkgZXf77q8V6gMDvvUA&s'
        },
        {
            name: "French Ligue 1",
            code: "FRA.1",
            image: 'https://1000logos.net/wp-content/uploads/2018/10/French-Ligue-1-logo.png'
        },
        {
            name: "Dutch Eredivisie",
            code: "NED.1",
            image: 'https://sassets.knvb.nl/sites/knvb.com/files/styles/ls-1920x1080/public/logo-eredivisie_0.jpg?itok=VW329CY2'
        },
        {
            name: "English FA Cup",
            code: "ENG.FA",
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/Fa_cup.svg/1200px-Fa_cup.svg.png'
        }

    ]


    const americas = [
        {
            name: "Major League Soccer",
            code: "USA.1"
        },
        {
            name: "Mexican Liga BBVA MX",
            code: "MEX.1"
        },
        {
            name: "CONCACAF Champions League",
            code: "CONCACAF.CHAMPIONS"
        }
    ]


    const regionsAndLeagues = [
        { name: 'Europe', leagues: europe },
        { name: 'Americas', leagues: americas }
    ]

    res.send(regionsAndLeagues);
});


router.get("/:leagueCode/articles", async (req, res) => {
    const league = req.params.leagueCode;
    const articles = await axios.get(`ttp://site.api.espn.com/apis/site/v2/sports/soccer/${league}/news`);
    res.send(articles.data)
})
module.exports = router;