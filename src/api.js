const recommendations = [
  { id: 1, text: "Work hard, party harder" },
  {
    id: 2,
    text: "Never stop learning",
    comments: [{ id: 1, text: "A good comment" }, { id: 1, text: "Another comment here" }]
  }
];

const delay = (time = 2000) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

const api = {
  getRecommendations: () => delay().then(() => recommendations)
};

export default api;
