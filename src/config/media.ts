export const media = {
  heroModel: "https://images.pexels.com/photos/29815908/pexels-photo-29815908.jpeg?auto=compress&cs=tinysrgb&w=1600",
  collection1: "https://images.pexels.com/photos/5185598/pexels-photo-5185598.jpeg?auto=compress&cs=tinysrgb&w=1600",
  collection2: "https://images.pexels.com/photos/5185593/pexels-photo-5185593.jpeg?auto=compress&cs=tinysrgb&w=1600",
  collection3: "https://images.pexels.com/photos/5185591/pexels-photo-5185591.jpeg?auto=compress&cs=tinysrgb&w=1600",
  look1: "https://images.pexels.com/photos/31648372/pexels-photo-31648372.jpeg?auto=compress&cs=tinysrgb&w=1600",
  look2: "https://images.pexels.com/photos/20426350/pexels-photo-20426350.jpeg?auto=compress&cs=tinysrgb&w=1600",
  look3: "https://images.pexels.com/photos/29768364/pexels-photo-29768364.jpeg?auto=compress&cs=tinysrgb&w=1600",
  look4: "https://images.pexels.com/photos/31823166/pexels-photo-31823166.jpeg?auto=compress&cs=tinysrgb&w=1600",

  pexelsEditorial1:
    "https://images.pexels.com/photos/5185598/pexels-photo-5185598.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial2:
    "https://images.pexels.com/photos/31648372/pexels-photo-31648372.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial3:
    "https://images.pexels.com/photos/20426350/pexels-photo-20426350.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial4:
    "https://images.pexels.com/photos/29768364/pexels-photo-29768364.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial5:
    "https://images.pexels.com/photos/5679499/pexels-photo-5679499.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial6:
    "https://images.pexels.com/photos/10356436/pexels-photo-10356436.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsRunway1:
    "https://images.pexels.com/photos/5185593/pexels-photo-5185593.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsRunway2:
    "https://images.pexels.com/photos/5185591/pexels-photo-5185591.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial7:
    "https://images.pexels.com/photos/31823166/pexels-photo-31823166.jpeg?auto=compress&cs=tinysrgb&w=1600",
  pexelsEditorial8:
    "https://images.pexels.com/photos/29815908/pexels-photo-29815908.jpeg?auto=compress&cs=tinysrgb&w=1600",

  product1Alt1:
    "https://images.pexels.com/photos/5585830/pexels-photo-5585830.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product1Alt2:
    "https://images.pexels.com/photos/5585829/pexels-photo-5585829.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product2Alt1:
    "https://images.pexels.com/photos/5185567/pexels-photo-5185567.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product2Alt2:
    "https://images.pexels.com/photos/5185596/pexels-photo-5185596.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product3Alt1:
    "https://images.pexels.com/photos/1522941/pexels-photo-1522941.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product3Alt2:
    "https://images.pexels.com/photos/5185597/pexels-photo-5185597.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product4Alt1:
    "https://images.pexels.com/photos/10356550/pexels-photo-10356550.jpeg?auto=compress&cs=tinysrgb&w=1200",
  product4Alt2:
    "https://images.pexels.com/photos/10356537/pexels-photo-10356537.jpeg?auto=compress&cs=tinysrgb&w=1200",

  heroVideo:
    "https://videos.pexels.com/video-files/9512046/9512046-uhd_4096_2160_25fps.mp4",
  heroVideoPoster:
    "https://images.pexels.com/videos/9512046/pexels-photo-9512046.jpeg?auto=compress&cs=tinysrgb&w=1920",
};

export function srcSet(url: string): string {
  return [400, 800, 1200, 1600]
    .map(w => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`)
    .join(", ");
}

export function srcSetSmall(url: string): string {
  return [200, 400, 800, 1200]
    .map(w => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`)
    .join(", ");
}
