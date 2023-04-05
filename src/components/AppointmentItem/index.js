import './index.css'

const outlineStarUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
const filledStarUrl =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

const AppointmentItem = props => {
  const {details, onChangeStar} = props
  const {id, title, date, isStarred} = details

  const changeStar = () => {
    onChangeStar(id)
  }

  const starUrl = isStarred ? filledStarUrl : outlineStarUrl

  return (
    <li className="appointItem">
      <div className="nameAndStar">
        <p className="appointmentName">{title}</p>
        <button
          type="button"
          onClick={changeStar}
          className="starButton"
          data-testid="star"
        >
          <img src={starUrl} alt="star" className="starImg" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
