const users = [
  {
    id: '2443597',
    username: 'Leo',
    token: 'qdkfjhqlrufhpaibdv',
    tokenSecret: 'qlfkjqdmlvqdfbvqm',
    resourceUrl: 'https://discogs.com',
  },
  {
    id: '2478357',
    username: 'Berta',
    token: 'sdjfqm',
    tokenSecret: 'fsiqljm',
    resourceUrl: 'https://discogs.com',
  },
  {
    id: '1432560',
    username: 'Mo',
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
    name: 'Morning Breaks',
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
    postTitle: 'Bananaramaaaa',
    title: 'The Velvet Underground & Nico',
    artist: 'The Velvet Underground',
    year: 1966,
    label: 'Verve Records',
    body: 'Array is not an array ?',
    thumbnail:
      'https://img.discogs.com/PaJz9xI0VmAltBM72HrOEJAZx44=/fit-in/600x587/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-5034045-1454593768-8856.jpeg.jpg',
    url:
      'https://www.discogs.com/fr/The-Velvet-Underground-Nico-The-Velvet-Underground-Nico/master/35276',
  },
  {
    postTitle: 'For those who misses the bush',
    title: 'Bushes',
    artist: 'Markus Nickolai',
    year: 1998,
    label: 'Perlon',
    body: 'There is someone in the bush',
    thumbnail:
      'https://img.discogs.com/rGc19pz11eLORpHUDqyu7bSRwBg=/fit-in/482x480/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1765-1390154333-3631.jpeg.jpg',
    url:
      'https://www.discogs.com/fr/Markus-Nikolai-Passion-Bushes/master/512630',
  },
  {
    postTitle: 'No gravity, to take literally',
    title: 'No gravity',
    artist: 'Closer MusiK',
    year: 2004,
    label: 'Kompakt',
    body:
      'I was listening to this yesterday and felt very melancholic. Wanted to share it with you guys !',
    thumbnail:
      'https://img.discogs.com/uTnFRVO3XY9eJwq9LxdXiE4BrS4=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-41046-1099790381.jpg.jpg',
    url:
      'https://www.discogs.com/fr/Closer-Musik-One-Two-Three-No-Gravity/release/41046',
  },
];

const comments = [
  {
    body: 'Stop with your Bananas and come dance !!',
  },
  {
    body: 'I am already in the bush, come and join me ;) !!!',
  },
  {
    body: "Don't be sad Leo, come have some carlitos at CW",
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
