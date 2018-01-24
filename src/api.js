function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const generateId = () => getRandomInt(0, 1000000);

const recommendations = [
  { id: generateId(), text: "Work hard, party harder" },
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

const api = {
  getRecommendations: () => delay().then(() => recommendations),
  createRecommendation: text =>
    delay(1200).then(() => ({
      text,
      id: generateId()
    }))
};

export default api;
