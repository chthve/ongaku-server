const users = [
  {
    id: '24435',
    username: 'Baiju',
    token: 'qdkfjhqlrufhpaibdv',
    tokenSecret: 'qlfkjqdmlvqdfbvqm',
    resourceUrl: 'https://discogs.com',
  },
  {
    id: '247835',
    username: 'Gui',
    token: 'sdjfqm',
    tokenSecret: 'fsiqljm',
    resourceUrl: 'https://discogs.com',
  },
  {
    id: '143256',
    username: 'George',
    token: 'qfdkhlfkqh',
    tokenSecret: 'qlfkjqdmfqjsdvblvqdfbvqm',
    resourceUrl: 'https://discogs.com',
  },
];

const defaultChannels = [
  {
    name: 'Electronic',
  },
  {
    name: 'Jazz',
  },
  {
    name: 'Rock',
  },
  {
    name: 'Classical',
  },
  {
    name: 'World',
  },
  {
    name: 'Funk',
  },
  {
    name: 'Pop',
  },
  {
    name: 'Experimental',
  },
  {
    name: 'Blues',
  },
  {
    name: 'Hip-Hop',
  },
];

const privateChannels = [
  {
    name: 'Festival 2021',
  },
  {
    name: "Ambient 90's",
  },
  {
    name: 'Psychedelics PLUS',
  },
];

const tags = [
  { name: 'chill' },
  { name: 'after' },
  { name: 'mushrooms' },
  { name: 'sunset' },
  { name: 'dark' },
  { name: 'hot potatoes' },
];

const posts = [
  {
    postTitle: 'Classic Tune !',
    title: 'E2E4',
    artist: 'Manuel Gottsching',
    year: 1984,
    label: 'MG.Art',
    body: 'My favorite tune ever',
    thumbnail:
      'https://img.discogs.com/aPGUpMPZGt6kRWSto6JCFeom57I=/fit-in/600x600/filters:strip_ic[…]rgb():quality(90)/discogs-images/R-303333-1290356604.jpeg.jpg',
    url: 'https://www.discogs.com/fr/Manuel-G%C3%B6ttsching-E2-E4/master/2786',
  },
  {
    postTitle: 'For thus who misses the bush',
    title: 'Bushes',
    artist: 'Markus Nickolai',
    year: 1998,
    label: 'Perlon',
    body: 'There is someone in the bush',
    thumbnail:
      'https://img.discogs.com/rGc19pz11eLORpHUDqyu7bSRwBg=/fit-in/482x480/filters:strip_ic[…]():quality(90)/discogs-images/R-1765-1390154333-3631.jpeg.jpg',
    url:
      'https://www.discogs.com/fr/Markus-Nikolai-Passion-Bushes/master/512630',
  },
];

const comments = [
  {
    body: 'Oh my god my tuneeee!!!',
  },
  {
    body: 'I am already in the bush, come and join me ;) !!!',
  },
];

module.exports = {
  users,
  defaultChannels,
  tags,
  privateChannels,
  posts,
  comments,
};
