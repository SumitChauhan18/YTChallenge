import "react"
import {useState} from "react";

export function MCQChallenge({challenge, showExplanation = false}) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)
    const option = typeof challenge.options === "string" ? JSON.parse(challenge.options) : challenge.options
    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }
    const getOptionsClass = (index) => {
        if (selectedOption === null) return "option";
        if (index === challenge.correct_answer_id) {
            return "option correct"
        }
        if (selectedOption === index && index != challenge.correct_answer_id) {
            return "option incorrect"
        }
    }
    return <div className="challenge-display">
        <p><strong>Difficulty</strong>{challenge.difficulty}</p>
        <p className="challenge-tittle">{challenge.tittle}</p>
        <div className="options">
            {options.map((option, index) =>(
                <div className={getOptionsClass(index)}
                key={index}
                onClick={()=> handleOptionSelect(index)}>
                    {option}
                </div>
            ))}
        </div>
        {shouldShowExplanation && selectedOption !== null && (
            <div className="explanation">
                <h4>Explanation</h4>
                <p>{challenge.explanation}</p>
            </div>
        )}
    </div>
}
