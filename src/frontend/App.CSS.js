export default {
  body: {
    margin: 0
  },
  '.image-gallery': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  '.image-gallery-slide': {
    transition: 'none',
    img: {
      flex: '1 1 0',
      objectFit: 'scale-down'
    },
    '&.center': {
      display: 'flex',
      flex: '1 1 0'
    }
  },
  '.image-gallery-thumbnails': {
    flexShrink: 0,
    background: 'inherit',
    padding: 0
  },
  '.image-gallery-content, .image-gallery-content > div, .image-gallery-slides': {
    display: 'flex',
    flex: '1 1 0'
  }
};
