// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function handler(req, res) {
  res.status(200).json({ valor:  getRandomInt(1,13)})
}
