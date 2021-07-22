import React, { useEffect, useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import "./Table.css";
const Table = ({ candidate1, candidate2 ,voteCandidate,address}) => {
  useEffect(() => {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems);
    // var instance = M.FormSelect.getInstance(elems);
    // setSelectedCan(instance.getSelectedValues());
  });
    const [selectedCan, setSelectedCan] = useState();
    const handleChange = (e) => {
        setSelectedCan(e.target.value);
        //console.log(selectedCan);
    }
    const handleSubmit = () => {
        //e.preventDefault();
      //console.log("in handle submit");
      if (selectedCan !== 0) {
        console.log(selectedCan);
            voteCandidate(Number(selectedCan));
           // console.log("Success");
        } else {
            window.alert("Error in Submission");
        }
    }
  return (
    <div>
      <h5 className="center head">ELECTION RESULTS</h5>
      <div className="divider"></div>
      <div className="row">
        <div className="col l8 offset-l2 s12 table-div">
          <table className=" ">
            <thead>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th>VoteCount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{candidate1.id}</td>
                <td>{candidate1.name}</td>
                <td>{candidate1.voteCount}</td>
              </tr>
              <tr>
                <td>{candidate2.id}</td>
                <td>{candidate2.name}</td>
                <td>{candidate2.voteCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12 m8 l5 offset-l2">
          <select onChange = {handleChange}>
                <option value="" disabled selected>
                Choose your option
                </option>
            <option value="1" className = "grey-text text-darken-3">{candidate1.name}</option>
            <option value="2">{candidate2.name}</option>
          </select>
        </div>
        <div className="center col ">
          <button className="btn waves-effect " type="submit" onClick={handleSubmit}>VOTE</button>
        </div>
      </div>
      <div className="row">
        <div className="col s12 l8 offset-l2">
          <p className="addre ">Your Address : {address }</p>
        </div>
      </div>
    </div>
  );
};

export default Table;
