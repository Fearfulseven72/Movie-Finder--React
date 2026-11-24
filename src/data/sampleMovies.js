const entries = [
  ['tt0232500', 'The Fast and the Furious', '2001', 'https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY%40._V1_.jpg'],
  ['tt1905041', 'Fast & Furious 6', '2013', 'https://i5.walmartimages.com/seo/FAST-FURIOUS-6-11x17-Framed-Movie-Poster_ad645754-63cb-4954-b995-0c9c66f675ce.a3037a65b70b588cb16c2e57e1019cf7.jpeg'],
  ['tt1596343', 'Fast Five', '2011', 'https://artofthemovies.co.uk/cdn/shop/products/IMG_1179_1578be70-e295-47ec-af9c-55f68e01313a_1024x1024%402x.jpg?v=1677088660'],
  ['tt1013752', 'Fast & Furious', '2009', 'https://amc-theatres-res.cloudinary.com/image/upload/f_auto/q_auto%3Alow/amc-cdn/production/2/movies/66400/66420/PosterDynamic/123531.jpg'],
  ['tt0463985', 'The Fast and the Furious: Tokyo Drift', '2006', 'https://artofthemovies.co.uk/cdn/shop/files/IMG_9273.jpg?v=1748874654&width=1946'],
  ['tt0322259', '2 Fast 2 Furious', '2003', 'https://artofthemovies.co.uk/cdn/shop/files/IMG_0405-2-795566_9dd84828-a31b-421d-8c3d-5b3303f5ad44.jpg?v=1688402440'],
  ['tt6806448', 'Fast & Furious Presents: Hobbs & Shaw', '2019', 'https://m.media-amazon.com/images/M/MV5BNmU4OTA5NGYtMTFjMS00MzgxLWFjNTMtYjdlMThlYzc4M2M4XkEyXkFqcGc%40._V1_.jpg'],
  ['tt5433138', 'F9: The Fast Saga', '2021', 'https://www.thecinemacollection.com/cdn/shop/products/F9EM_grande.jpg?v=1632930683'],
  ['tt5433140', 'Fast X', '2023', 'https://static.titlovi.com/img/0317/317880-tt5433140.jpg'],
  ['tt0083929', 'Fast Times at Ridgemont High', '1982', 'https://printedoriginals.com/cdn/shop/products/fast1_1024x1024%402x.jpg?v=1659456082'],
];

export const sampleMovies = entries.map(([imdbID, Title, Year, Poster]) => ({
  imdbID,
  Title,
  Year,
  Poster,
}));

export const sampleDetails = {
  tt0232500: {
    imdbRating: '6.8',
    Released: '22 Jun 2001',
    Genre: 'Action, Crime, Thriller',
    Writer: 'Ken Li, Gary Scott Thompson, Erik Bergquist',
    Actors: 'Vin Diesel, Paul Walker, Michelle Rodriguez',
    Plot: 'An undercover Los Angeles police officer infiltrates an illegal street racing crew suspected of high-speed cargo hijackings.',
    Language: 'English, Spanish',
    Awards: '11 wins & 18 nominations total',
  },
};

