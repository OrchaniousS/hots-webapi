import request from "request";

export const getWeekly = (req, res) => {
  const bHTMLSPLIT = [];

  request("https://heroesofthestorm.com/en-us/", (error, response, body) => {
    console.error("error:", error);
    console.log("statusCode:", response && response.statusCode);

    const bodyHTML = JSON.stringify(body).toString();
    const bodyHTMLSplit = bodyHTML
      .split("<section")[6]
      .split(`<h2 class=\\"hero__title\\">`);

    for (let i = 1, j = 0; i < bodyHTMLSplit.length; i++, j++) {
      const splittedHero =
        bodyHTMLSplit[i].split("</h2>", 1)[0].length > 20
          ? ""
          : bodyHTMLSplit[i].split("</h2>", 1)[0];
      const splittedHeroLink =
        bodyHTMLSplit[j].split("src=\\", 2)[1] === undefined
          ? ""
          : bodyHTMLSplit[j]
              .split("src=\\", 2)[1]
              .split("alt=\\", 1)[0]
              .split('"')[1]
              .split("\\")[0];
      bHTMLSPLIT.push({
        heroName: splittedHero,
        heroLink: splittedHeroLink,
      });
    }
    res.set("Cache-Control", "public, max-age=300,s-maxage=600");
    console.log(bHTMLSPLIT);

    const heroDiv = bHTMLSPLIT.map(
      (hero) =>
        "<div><p>" + hero.heroName + "</p> <p>" + hero.heroLink + "</p></div>"
    );
    console.log(heroDiv);
    res.send(bHTMLSPLIT);

    // res.send(
    //   "<div>" +
    //     heroDiv.map((info) => {
    //       return `<div>${info}</div>`;
    //     }) +
    //     "</div>"
    // );
  });
};
