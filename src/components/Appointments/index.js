// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: [], filteredStarred: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitForm = event => {
    const {title, date} = this.state
    event.preventDefault()
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }
    this.setState(preState => ({
      appointmentList: [...preState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeStar = id => {
    console.log('on change star got hit....')
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.id === id) {
          console.log('id matched------------')
          console.log(eachItem.isStarred)
          console.log(!eachItem.isStarred)
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  displayStarred = () => {
    this.setState(preState => ({
      filteredStarred: !preState.filteredStarred,
    }))
  }

  render() {
    const {title, date, appointmentList, filteredStarred} = this.state
    const displayAppointmentList = !filteredStarred
      ? appointmentList
      : appointmentList.filter(eachItem => eachItem.isStarred)
    return (
      <div className="app_container">
        <div className="content_container">
          <div className="inputsAndImage_container">
            <form className="formInputs_container" onSubmit={this.onSubmitForm}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="titleId" className="label_name">
                TITLE
              </label>
              <input
                onChange={this.onChangeTitle}
                id="titleId"
                type="text"
                value={title}
                className="title_input"
                placeholder="Title"
              />
              <br />
              <label htmlFor="dateId" className="label_name">
                DATE
              </label>
              <input
                onChange={this.onChangeDate}
                id="dateId"
                type="date"
                value={date}
                className="date_input"
              />
              <br />
              <div>
                <button type="submit" className="addButton">
                  Add
                </button>
              </div>
            </form>
            <div className="img_container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>

          <hr className="hrLine" />

          <div className="appointmentsContainer">
            <div className="headingAndButton">
              <h1 className="appointHeading">Appointments</h1>
              <div>
                <button
                  className="starred_Button"
                  type="button"
                  onClick={this.displayStarred}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="appointsLists">
              {displayAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  details={eachAppointment}
                  onChangeStar={this.onChangeStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
