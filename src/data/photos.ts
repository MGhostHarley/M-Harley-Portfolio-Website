import dog from '../assets/photos/dog.webp'
import elephant from '../assets/photos/elephant.webp'
import istanbul from '../assets/photos/istanbul.webp'
import london from '../assets/photos/london.webp'
import type { Photo } from './types'

// Pre-cropped to 4:5 at 800×1000 around Em; shown in this order in the hero.
export const photos: Photo[] = [
  { src: dog, alt: 'Em with a yellow Labrador' },
  {
    src: elephant,
    alt: 'Em on a forest trail with an elephant in the background',
  },
  { src: istanbul, alt: 'Em in front of a domed mosque on a sunny day' },
  {
    src: london,
    alt: 'Em on a bridge over a lake with the London Eye in the distance',
  },
]
