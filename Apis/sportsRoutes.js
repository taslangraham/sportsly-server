const express = require("express");
const router = express.Router();
const axios = require("axios");




// returns array of all sports
router.get("/", (req, res) => {
  res.send({ sports: getSports() });
});

//get teams for a sport EXCEPT SOCCER
router.get("/:sport/teams", async (req, res) => {
  res.send(await getTeamsBySport(req.params.sport));
});

// return article based on ID
router.get("/article/:id", (req, res) => {
  const espnArticleApiBaseUrl = "http://now.core.api.espn.com/v1/sports/news/";

  axios.get(`${espnArticleApiBaseUrl}${req.params.id}`).then(results => {
    res.send(results.data.headlines[0])
  })

});

// returns all articles for the given sport
router.get("/:sport/articles", async (req, res) => {
  res.send(await getArticlesBySport(req.params.sport.toLowerCase()));
});

const getArticlesBySport = async sport => {
  switch (sport) {
    case "nba":
    case "wnba": {
      return await getBasketballArticles(sport);
    }
    case "soccer": {
      console.log("sport in switch: ", sport);
      break;
    }
    case "nfl": {
      return await getNflArticles(sport);
    }
  }
};

const getBasketballArticles = async sport => {
  articles = await axios.get(
    `http://site.api.espn.com/apis/site/v2/sports/basketball/${sport}/news`
  );

  return {
    articles: articles.data.articles
  };
};


const getNflArticles = async sport => {
  articles = await axios.get(
    `http://site.api.espn.com/apis/site/v2/sports/football/nfl/news`
  );

  return {
    articles: articles.data.articles
  };
};


const getTeamsBySport = sport => {
  switch (sport) {
    case "nba":
    case "wnba": {
      return getBasketballTeams(sport);
    }
    case "nfl": {
      return getNflTeams(sport);
    }
    case "soccer": {
      console.log(sport);
    }
  }
};

const getNflTeams = async sport => {
  teams = await axios.get(
    `http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
  );
  leagueName = teams.data.sports[0].leagues[0].name;
  teams = teams.data.sports[0].leagues[0].teams;
  return {
    leagueName: leagueName,
    teams: teams
  };
};

const getBasketballTeams = async sport => {
  teams = await axios.get(
    ` http://site.api.espn.com/apis/site/v2/sports/basketball/${sport}/teams`
  );

  leagueName = teams.data.sports[0].leagues[0].name;
  teams = teams.data.sports[0].leagues[0].teams;

  return {
    leagueName: leagueName,
    teams: teams
  };
};



const getSports = () => {
  sports = [
    //   {
    //   sport: "Soccer",
    //   logoUrl: "https://e2.365dm.com/19/04/768x432/skysports-lionel-messi-barcelona_4633858.jpg?20190409153137"
    // },
    {
      sport: "NBA",
      logoUrl: 'https://img.zeit.de/news/2019-12/19/schroeder-fuehrt-okc-zum-sieg-theis-siegt-mit-boston-image.jpeg/wide__1300x731'
    },
    {
      sport: "WNBA",
      logoUrl: "https://cdn-s3.si.com/s3fs-public/styles/marquee_large_2x/public/2019/05/21/wnba-2019-finals-odds.jpg?itok=x3oz7aDK"
    },
    {
      sport: "NFL",
      logoUrl: "https://ewscripps.brightspotcdn.com/dims4/default/c282efa/2147483647/strip/true/crop/900x506+0+84/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F66%2Fd3%2F132536094e50bbb6c1ba02a501cd%2Fnfl-logo-generic.jpg"
    }
  ];
  return sports;
};

module.exports = router;