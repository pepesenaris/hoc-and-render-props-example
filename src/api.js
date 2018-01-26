function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const generateId = () => getRandomInt(0, 1000000);

let recommendations = [
  { id: generateId(), text: "Work hard, party harder", comments: [] },
  {
    id: generateId(),
    text: "Never stop learning",
    comments: [
      { id: generateId(), text: "A good comment" },
      { id: generateId(), text: "Another comment here" }
    ]
  }
];

const delay = (time = 2000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

const CREATE_DELAY = 1200;

const api = {
  getRecommendations: () => delay().then(() => recommendations),
  createRecommendation: text =>
    delay(CREATE_DELAY).then(() => ({
      text,
      id: generateId()
    })),
  createComment: (recommendationId, text) =>
    delay(CREATE_DELAY)
      .then(() => recommendations.find(rec => rec.id === recommendationId))
      .then(rec => ({
        ...rec,
        comments: [...rec.comments, { id: generateId(), text }]
      }))
      .then(recommendation => {
        const index = recommendations.findIndex(rec => rec.id === recommendationId);
        const updated = [
          ...recommendations.slice(0, index),
          recommendation,
          ...recommendations.splice(index + 1)
        ];
        recommendations = updated;
        return recommendations;
      })
};

export default api;
