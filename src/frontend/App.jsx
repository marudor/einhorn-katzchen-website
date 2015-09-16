import React from 'react';
import ImageGallery from 'react-image-gallery';
import Radium, { Style } from 'radium';
import 'react-image-gallery/build/image-gallery.css';
import AppCss from './App.CSS.js';

@Radium
export default class App extends React.Component {
  static style = {
    wrapper: {
      height: '100%',
      width: '100%',
      backgroundColor: 'black'
    },
    text: {
      backgroundColor: 'black',
      border: '1px solid white',
      borderRadius: 5,
      color: 'white',
      fontSize: 'small',
      maxWidth: '30%',
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 5
    },
    innerText: {
      paddingRight: 10,
      paddingTop: 3,
      paddingLeft: 3,
      paddingBottom: 3
    },
    playControl: {
      backgroundColor: 'black',
      border: '1px solid white',
      borderRadius: 5,
      padding: 3,
      color: 'white',
      position: 'absolute',
      top: 25,
      left: 0,
      zIndex: 5
    },
    paypal: {
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: 5
    },
    flattr: {
      top: 0,
      left: 0,
      position: 'absolute',
      zIndex: 5
    },
    leftSide: {
      '@media (max-width: 768px)': {
        display: 'none'
      }
    },
    textClose: {
      position: 'absolute',
      top: 0,
      right: 0
    },
    textExpand: {
      fontSize: 'small',
      padding: 3
    }
  }
  state = {
    autoPlay: false,
    showText: localStorage.showText ? JSON.parse(localStorage.showText) : true,
    showThumbnails: true
  }
  handleHashChange = () => {
    if (location.hash) {
      const number = parseInt(location.hash.replace('#', ''));
      if (this.refs.gallery) {
        this.refs.gallery.slideToIndex(number - 1);
      }
    }
  }
  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('keydown', this.handleKeyDown);
    let number;
    if (location.hash) {
      number = parseInt(location.hash.replace('#', ''));
    } else {
      number = images.length;
    }
    if (isNaN(number)) {
      number = images.length;
    }
    this.refs.gallery.slideToIndex(number - 1);
    flattrFoo();
  }
  handleSlide = index => {
    if (isNaN(index)) {
      index = images.length - 1;
    }
    this.setState({
      index
    });
    if (index + 1 === images.length) {
      history.replaceState({}, document.title, '/');
    } else {
      location.hash = index + 1;
    }
  }
  handleKeyDown = e => {
    const { gallery } = this.refs;
    const { showThumbnails, index } = this.state;
    if (e.keyCode === 37) {
      gallery.slideToIndex(index - 1);
    } else if (e.keyCode === 39) {
      gallery.slideToIndex(index + 1);
    } else if (e.keyCode === 13) {
      this.setState({
        showThumbnails: !showThumbnails
      });
    }
  }
  handlePlayPause = () => {
    const { autoPlay } = this.state;
    this.setState({
      autoPlay: !autoPlay
    });
    const { gallery } = this.refs;
    if (autoPlay) {
      gallery.pause();
    } else {
      gallery.play();
    }
  }
  textToggle = () => {
    let { showText } = this.state;
    showText = !showText;
    localStorage.showText = JSON.stringify(showText);
    this.setState({
      showText
    });
  }
  render() {
    const style = App.style;
    const { showThumbnails, showText, index, autoPlay } = this.state;
    const currentImage = images[index];
    return (
      <div style={style.wrapper}>
        <Style rules={AppCss}/>
        <div style={style.leftSide}>
          <div style={style.flattr}><div id="flattr"/></div>
          <div style={style.playControl}>
            <i onClick={this.handlePlayPause} className={`fa fa-${autoPlay ? 'pause' : 'play'}`}/>
          </div>
        </div>
        {
          currentImage && (<div style={style.text}>
            <i onClick={this.textToggle} style={showText ? style.textClose : style.textExpand} className={`fa fa-${showText ? 'close' : 'expand'}`}/>
            {showText && (<div style={style.innerText}>{currentImage.text.replace(/&quot;/g, '"')}</div>)}
          </div>
        )}
        <ImageGallery autoPlay={autoPlay} showThumbnails={showThumbnails} onSlide={this.handleSlide} ref="gallery" items={images}/>
      </div>
    );
  }
}
