export default {
  body: {
    margin: 0
  },
  '.image-gallery': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  '.image-gallery-content': {
    display: 'flex',
    flex: '1 1 0'
  },
  '.image-gallery-content > div': {
    display: 'flex',
    flex: '1 1 0'
  },
  '.image-gallery-slides': {
    display: 'flex',
    flex: '1 1 0'
  },
  '.image-gallery-slide': {
    transition: 'none',
    img: {
      height: 'initial',
      width: 'initial',
      objectFit: 'contain'
    }
  },
  '.image-gallery-slide.center': {
    display: 'flex',
    justifyContent: 'center'
  },
  '.image-gallery-thumbnails': {
    background: 'inherit',
    padding: 0
  }
};
