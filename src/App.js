import cardDesign from "./images/Screenshot 2023-08-22 at 5.43.28 PM.png";
import "./App.css";
import tachyons from "tachyons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

function App() {
  ////////////////////////////////////////////////
  // state
  ////////////////////////////////////////////////
  const [confirm, setConfirm] = useState(false);
  const [cvc, setCvc] = useState("000");
  const [cardDigits, setCardDigits] = useState("0000 0000 0000 0000");
  const [name, setName] = useState("Justin Jefferson");
  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("00");

  ////////////////////////////////////////////////
  // error state
  ////////////////////////////////////////////////
  const [nameError, setNameError] = useState(false);
  const [digitError, setDigitError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [cvcError, setCvcError] = useState(false);

  ////////////////////////////////////////////////
  //* date and regex for checking for legitimate card entries
  ////////////////////////////////////////////////
  const date = new Date();
  const todaysMonth = date.getMonth() + 1;
  const numRegex = /\d/g;

  ////////////////////////////////////////////////
  // * initial actions once we press confirm
  ////////////////////////////////////////////////
  const confirmDetails = () => {
    // grabbing input elements to read values
    const cvcCode = document.getElementById("code").value;
    const nameID = document.getElementById("name").value;
    const monthID = document.getElementById("month").value;
    const yearID = document.getElementById("year").value;
    const numberID = document.getElementById("card-number").value;
    const modal = document.getElementById("modal");

    ////////////////////////////////////////////////
    //* logic to ensure accurate submissions
    ////////////////////////////////////////////////
    // early return to prevent error of setting display card to null values
    if (!cvcCode && !nameID && !monthID && !yearID && !numberID) {
      return;
    }

    // use state to determine error logging instead
    if (!nameError && !digitError && !monthError && !yearError && !cvcError) {
      setCvc(cvcCode);
      setName(nameID);
      setMonth(monthID);
      setYear(yearID);

      ////////////////////////////////////////////////
      // * ensures no non-digits have been entered in input
      ////////////////////////////////////////////////
      let result = numberID.match(/.{1,4}/g ?? []).join(" ");
      setCardDigits(result);
      setConfirm(true);
    } else {
      modal.classList.remove("hidden");
    }
  };

  ////////////////////////////////////////////////
  // * setting invalid borders for specific fields
  // * contains individual onChange evenet listenrs
  ////////////////////////////////////////////////
  const onNameChange = (e) => {
    if (e.target.value.split(" ").length < 2) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const onMonthChange = (e) => {
    const yearID = document.getElementById("year").value;
    if (yearID.length > 1) {
      if (
        e.target.value > 0 &&
        e.target.value < 13 &&
        ((yearID > 22 && e.target.value > todaysMonth) || yearID > 23)
      ) {
        setMonthError(false);
        setYearError(false);
      } else {
        setMonthError(true);
        setYearError(true);
      }
    } else {
      setMonthError(true);
    }
  };

  const onYearChange = (e) => {
    const monthID = document.getElementById("month").value;

    if ((e.target.value > 22 && monthID > todaysMonth) || e.target.value > 23) {
      setYearError(false);
      setMonthError(false);
    } else {
      setYearError(true);
      setMonthError(true);
    }
  };

  const onDigitChange = (e) => {
    if (e.target.value.match(numRegex).length === 16) {
      setDigitError(false);
      console.log("its working");
    } else {
      console.log("error");
      setDigitError(true);
    }
  };

  const onCvcChange = (e) => {
    if (e.target.value.length === 3) {
      setCvcError(false);
    } else {
      setCvcError(true);
    }
  };

  ////////////////////////////////////////////////
  // * continue / reset button
  ////////////////////////////////////////////////
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

  ////////////////////////////////////////////////
  // * error modal
  ////////////////////////////////////////////////
  const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
  };

  return (
    <div className="main-container">
      <Modal handleModal={closeModal} />
      <div className="initial-bg">
        {/* //* back card */}
        <div className="end">
          <div id="back-card">
            <div className="bar"></div>{" "}
            <div className="grey-bar">
              <p id="cvc">{cvc}</p>
            </div>
            <img id="card-design" src={cardDesign} alt="" />
          </div>
        </div>
        {/* //* front card */}
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
      {/* //* success / form section */}
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
              onChange={onNameChange}
              className={nameError ? "invalid" : null}
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
            {/* workaround bc the initial input field had a thicker 
            border than the rest
            for some reason, so when I styled it 
            it messed up the class toggle for invalid status*/}
            {digitError ? (
              <input
                onChange={onDigitChange}
                style={{ border: "solid 1px red" }}
                required
                type="text"
                minLength={16}
                maxLength={16}
                id="card-number"
                placeholder="e.g 1234 5678 9999 0000"
              />
            ) : (
              <input
                onChange={onDigitChange}
                required
                type="text"
                minLength={16}
                maxLength={16}
                id="card-number"
                placeholder="e.g 1234 5678 9999 0000"
              />
            )}
          </div>
          <div className="label-container">
            <div>
              <label id="date-label">exp. date (MM/YY) </label>
              <label for="code">CVC</label>
            </div>
            <div className="card-date-container">
              <input
                onChange={onMonthChange}
                className={monthError ? "invalid" : null}
                required
                type="text"
                minLength={2}
                maxLength={2}
                placeholder="MM"
                id="month"
              />
              <input
                onChange={onYearChange}
                className={yearError ? "invalid" : null}
                required
                type="text"
                minLength={2}
                maxLength={2}
                placeholder="YY"
                id="year"
              />
              <input
                onChange={onCvcChange}
                className={cvcError ? "invalid" : null}
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
