import { useState } from "react"
import Card from "../shared/Card"
import Button from "../shared/Button"
import RatingSelect from "./RatingSelect"

function FeedbackForm({handleAdd}) {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const handleTextChange = ({target: {value}}) => { // get the value, link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring
        if(value === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (value !== '' && value.trim().length <= 10) { // check for less than
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
                text: text,
                rating: rating,
            }
            handleAdd(newFeedback)
            setText('')
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            <RatingSelect select={(rating) => {setRating(rating)}} />
            <div className="input-group">
                <input 
                    onChange={handleTextChange}
                    type="text" 
                    placeholder="Write a review"
                    value={text}
                />
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}
export default FeedbackForm