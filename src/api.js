function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
const delay = (time = 1200) =>
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

const INITIAL_RECOMMENDATIONS = [
  newRecommendation("Work hard, party harder"),
  newRecommendation("Never stop learning", [
    newComment("A good comment"),
    newComment("Another comment here")
  ])
];

export const archived = [
  newRecommendation("Hasta la vista Baby"),
  newRecommendation("Run Forest Run", [newComment("And he did so")])
];

const updateList = (list, entityId) => updated => {
  const index = list.findIndex(item => item.id === entityId);
  return [...list.slice(0, index), updated, ...list.splice(index + 1)];
};

const findItem = (list, id) => () => list.find(item => item.id === id);

const api = {
  getRecommendations: () => delay(3000).then(() => INITIAL_RECOMMENDATIONS),
  createRecommendation: (list, text) =>
    delay()
      .then(() => newRecommendation(text))
      .then(rec => [...list, rec]),
  editRecommendation: (list, recommendationId, text) =>
    delay()
      .then(findItem(list, recommendationId))
      .then(rec => ({ ...rec, text }))
      .then(updateList(list, recommendationId)),
  createComment: (list, recommendationId, text) =>
    delay()
      .then(findItem(list, recommendationId))
      .then(rec => ({ ...rec, comments: [...rec.comments, newComment(text)] }))
      .then(updateList(list, recommendationId)),
  editComment: (list, recommendationId, commentId, text) =>
    delay()
      .then(findItem(list, recommendationId))
      .then(recommendation => ({
        recommendation,
        comment: findItem(recommendation.comments, commentId)()
      }))
      .then(({ recommendation, comment }) => ({
        ...recommendation,
        comments: updateList(recommendation.comments, comment.id)({ ...comment, text })
      }))
      .then(updateList(list, recommendationId))
};

export default api;
