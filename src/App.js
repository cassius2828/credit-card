import cardDesign from "./images/Screenshot 2023-08-22 at 5.43.28 PM.png";
import cardFront from "./images/bg-card-front.png";
import "./App.css";
import tachyons from "tachyons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faX } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [confirm, setConfirm] = useState(false);
  const [cvc, setCvc] = useState("000");
  const [cardDigits, setCardDigits] = useState("0000 0000 0000 0000");
  const [name, setName] = useState("Justin Jefferson");
  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("00");
const [nameError, setNameError] = useState(false);
const [digitError, setDigitError] = useState(false);
const [monthError, setMonthError] = useState(false);
const [yearError, setYearError] = useState(false);
const [cvcError, setCvcError] = useState(false);

  const date = new Date();
  const todaysMonth = date.getMonth + 1;
  const numRegex = /\d/g;

  const confirmDetails = () => {
    const cvcCode = document.getElementById("code").value;
    const nameID = document.getElementById("name").value;
    const monthID = document.getElementById("month").value;
    const yearID = document.getElementById("year").value;
    const numberID = document.getElementById("card-number").value;
    const modal = document.getElementById("modal");
    //* logic to ensure accurate submissions
    if (
      monthID > 0 &&
      monthID < 13 &&
      ((yearID > 22 && monthID > todaysMonth) || yearID > 23) &&
      numberID === numberID.match(numRegex).join("") &&
      numberID.length === 16
    ) {
      setCvc(cvcCode);
      setName(nameID);
      setMonth(monthID);
      setYear(yearID);
      let result = numberID.match(/.{1,4}/g ?? []).join(" ");
      setCardDigits(result);
      setConfirm(true);
    } else {
      modal.classList.remove("hidden");
    }


    ////////////////////////////////////////////////
    // * setting invalid borders for specific fields
    ////////////////////////////////////////////////

  };
  const onInputChange = (e) => {
        const cvcCode = document.getElementById("code").value;
        const nameID = document.getElementById("name").value;
        const monthID = document.getElementById("month").value;
        const yearID = document.getElementById("year").value;
        const numberID = document.getElementById("card-number").value;
        // ?  month
        if (
          monthID > 0 &&
          monthID < 13 &&
          ((yearID > 22 && monthID > todaysMonth) || yearID > 23)
        ) {
          setMonthError(false);
        } else {
          setMonthError(true);
        }
        // ? year
        if ((yearID > 22 && monthID > todaysMonth) || yearID > 23) {
          setYearError(false);
        } else {
          setYearError(true);
        }

        // ?  cvc
        if (cvcCode === 3) {
          setCvcError(false);
        } else {
          setCvcError(true);
        }

        // ? name
        if (nameID.split(" ") > 1) {
          setNameError(false);
        } else {
          setNameError(true);
        }

        // ? card digits length
        if (numberID.legnth === 16) {
          setDigitError(false);
        } else {
          setDigitError(true);
        }
  }

  useEffect(() => {
onInputChange(e);
console.log('change')
  });

  const continueBtn = () => {
    setCvc("000");
    setCardDigits("0000 0000 0000 0000");
    setName("Justin Jefferson");
    setMonth("00");
    setYear("00");
    setConfirm(false);
    setNameError(false);
    setDigitError(false);
    setMonthError(false);
    setYearError(false);
    setCvcError(false);

  };

  const closeModal = () => {
    const modal = document.getElementById("modal");

    modal.classList.add("hidden");
  };

  return (
    <div className="main-container">
      <Modal handleModal={closeModal} />
      <div className="initial-bg">
        {/* back card */}
        <div className="end">
          <div id="back-card">
            <div className="bar"></div>{" "}
            <div className="grey-bar">
              <p id="cvc">{cvc}</p>
            </div>
            <img id="card-design" src={cardDesign} alt="" />
          </div>
        </div>
        {/* front card */}
        <div className="start">
          <div className="front">
            <div id="front-card">
              <div className="circle-container">
                <div className="full-circle"></div>
                <div className="empty-circle"></div>
              </div>
              <div className="card-digit-container">
                <h3 className="card-digits">{cardDigits}</h3>
              </div>
              <div className="bottom-details">
                <p className="name">{name}</p>
                <p className="exp-date">{month + "/" + year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* success / form section */}
      {confirm ? (
        <div className="success-container">
          <FontAwesomeIcon id="check-icon" size="3x" icon={faCheck} />
          <h1>Thank You!</h1>
          <p>We've added your card details</p>
          <button onClick={continueBtn} className="mt4">
            <span>Continue</span>
          </button>
        </div>
      ) : (
        <div className="form-container">
          <div className="label-container">
            <label for="name" className="mb2">
              {" "}
              card holder name
            </label>
            <input
            onChange={onInputChange}
            className={nameError ? 'invalid' : null}
              required
              type="text"
              id="name"
              placeholder="e.g Justin Jefferson"
            />
          </div>
          <div className="label-container">
            <label for="card-number" className="mb2">
              card number
            </label>
            <input
            onChange={onInputChange}
            className={digitError ? 'invalid' : null}
              required
              type="text"
              minLength={16}
              maxLength={16}
              id="card-number"
              placeholder="e.g 1234 5678 9999 0000"
            />
          </div>
          <div className="label-container">
            <div>
              <label id="date-label">exp. date (MM/YY) </label>
              <label for="code">CVC</label>
            </div>
            <div className="card-date-container">
              <input
              onChange={onInputChange}
              className={monthError ? 'invalid' : null}
                required
                type="text"
                minLength={2}
                maxLength={2}
                placeholder="MM"
                id="month"
              />
              <input
              onChange={onInputChange}
              className={yearError ? 'invalid' : null}
                required
                type="text"
                minLength={2}
                maxLength={2}
                placeholder="YY"
                id="year"
              />
              <input
              onChange={onInputChange}
              className={cvcError ? 'invalid' : null}
                required
                type="text"
                minLength={3}
                maxLength={3}
                placeholder="e.g 123"
                id="code"
              />
            </div>
          </div>{" "}
          <button type="submit" id="submit" onClick={confirmDetails}>
            <span>confirm</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

export const Modal = ({ handleModal }) => {
  return (
    <div id="modal" className="hero-modal-container hidden">
      <div className="modal-container">
        <div>
          <FontAwesomeIcon onClick={handleModal} id="x-button" icon={faX} />
        </div>
        <div className="modal-text-container">
          <h2>Please Enter Legitimate Values for all Fields</h2>
        </div>
      </div>
    </div>
  );
};

/*
- keep it as a string? or make it numbers and then separate every 4 digits 
-A: make input required numbers only, then stringify numbers, separate by 4 digits with space


things to add 
1. require first and last name
2. highlight red border around failing areas
3. style for desktop and tablet
4. tweak styles for xs devices

*/
