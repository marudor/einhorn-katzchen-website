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
      padding: 5,
      color: 'white',
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 5
    },
    playControl: {
      backgroundColor: 'black',
      border: '1px solid white',
      borderRadius: 5,
      padding: 5,
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
    }
  }
  state = {
    autoPlay: false,
    showThumbnails: true
  }
  handleHashChange = () => {
    const number = parseInt(location.hash.replace('#', ''));
    if (this.refs.gallery) {
      this.refs.gallery.slideToIndex(number - 1);
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
    this.refs.gallery.slideToIndex(number - 1);
  }
  handleSlide = index => {
    this.setState({
      index
    });
    location.hash = index + 1;
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
  render() {
    const style = App.style;
    const { showThumbnails, index, autoPlay } = this.state;
    const currentImage = images[index];
    const paypal = {
      __html: `<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="LU76JGL2T9T2L">
      <input type="image" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.">
      <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/i/scr/pixel.gif" width="1" height="1">
      </form>`
    };
    return (
      <div style={style.wrapper}>
        <Style rules={AppCss}/>
        <div style={style.paypal} dangerouslySetInnerHTML={paypal}/>
        <div style={style.playControl}>
          <i onClick={this.handlePlayPause} className={`fa fa-${autoPlay ? 'pause' : 'play'}`}/>
        </div>
        {
          currentImage && (<div style={style.text}>
            {currentImage.text}
          </div>
        )}
        <ImageGallery autoPlay={autoPlay} showThumbnails={showThumbnails} onSlide={this.handleSlide} ref="gallery" items={images}/>
      </div>
    );
  }
}
