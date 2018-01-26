function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const delay = (time = 2000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

const generateId = () => getRandomInt(0, 1000000);

const newRecommendation = (text, comments = []) => ({
  text,
  comments,
  id: generateId(),
  created_at: Date.now()
});

const newComment = text => ({ text, id: generateId(), created_at: Date.now() });

let recommendations = [
  newRecommendation("Work hard, party harder"),
  newRecommendation("Never stop learning", [
    newComment("A good comment"),
    newComment("Another comment here")
  ])
];

const CREATE_DELAY = 1200;

const api = {
  getRecommendations: () => delay().then(() => recommendations),
  createRecommendation: text =>
    delay(CREATE_DELAY)
      .then(() => newRecommendation(text))
      .then(rec => {
        recommendations = [...recommendations, rec];
        return recommendations;
      }),
  createComment: (recommendationId, text) =>
    delay(CREATE_DELAY)
      .then(() => recommendations.find(rec => rec.id === recommendationId))
      .then(rec => ({ ...rec, comments: [...rec.comments, newComment(text)] }))
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
