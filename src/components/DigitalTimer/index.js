// Write your code here
import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    timerState: 'Paused',
    timer: 25,
    isTimerCompleted: false,
  }

  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  updateSeconds = () => {
    const {seconds, timerState, minutes} = this.state

    if (seconds === 0 && timerState === 'Running' && minutes >= 0) {
      this.setState(previousState => ({
        minutes: previousState.minutes - 1,
        seconds: 60,
      }))
    }

    if (timerState === 'Running' && minutes >= 0) {
      this.setState(previousState => ({seconds: previousState.seconds - 1}))
    }

    if (minutes === 0 && seconds === 1) {
      this.setState({timerState: 'Paused', isTimerCompleted: true})
      clearInterval(this.timerID)
    }
  }

  decrease = () => {
    const {timer, timerState} = this.state
    if (timer > 1 && timerState === 'Paused') {
      this.setState({timer: timer - 1})
      this.setState({minutes: timer - 1, seconds: 0})
    }
  }

  increase = () => {
    const {timer, timerState} = this.state
    if (timerState === 'Paused' && timer < 59) {
      this.setState({timer: timer + 1})
      this.setState({minutes: timer + 1, seconds: 0})
    }
  }

  toggle = () => {
    const {timerState, isTimerCompleted} = this.state

    console.log(isTimerCompleted)

    if (!isTimerCompleted) {
      if (timerState === 'Running') {
        this.setState({timerState: 'tempPaused'})
        clearInterval(this.timerID)
      } else {
        this.setState({timerState: 'Running'})

        this.timerID = setInterval(this.updateSeconds, 1000)
      }
    }
  }

  reset = () => {
    const {timer} = this.state
    this.setState({
      minutes: timer,
      seconds: 0,
      timerState: 'Paused',
      isTimerCompleted: false,
    })
    clearInterval(this.timerID)
  }

  render() {
    const {timer, minutes, seconds, timerState} = this.state
    const resTimerState =
      timerState === 'tempPaused' || timerState === 'Paused'
        ? 'Paused'
        : 'Running'
    const resMinutes = minutes <= 9 ? `0${minutes}` : minutes
    const resSeconds = seconds <= 9 ? `0${seconds}` : seconds
    return (
      <div className="main">
        <h1 className="h1">Digital Timer</h1>

        <div className="content">
          <div className="timeContainer">
            <div className="time">
              <h1 className="h2">
                {resMinutes}:{resSeconds}
              </h1>
              <p className="p1">{resTimerState}</p>
            </div>
          </div>

          <div className="content2">
            <div className="buttonsContainer">
              <div className="startContainer">
                <button onClick={this.toggle} type="button" className="button1">
                  {resTimerState === 'Paused' ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="image1"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="image1"
                    />
                  )}

                  <p className="p2">
                    {resTimerState === 'Paused' ? 'Start' : 'Pause'}
                  </p>
                </button>
              </div>

              <div className="resetContainer">
                <button onClick={this.reset} type="button" className="button2">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="image2"
                  />
                  <p className="p3">Reset</p>
                </button>
              </div>
            </div>

            <div className="timerLimitContainer">
              <p className="p4">Set Timer limit</p>
              <div className="timerLimit">
                <button
                  onClick={this.decrease}
                  type="button"
                  className="button3"
                >
                  -
                </button>
                <p className="p5">{timer}</p>
                <button
                  onClick={this.increase}
                  type="button"
                  className="button4"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
