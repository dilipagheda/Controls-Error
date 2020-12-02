import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import Header from "./Header";
import Card from "./Card";
import Select from "./Select";
import SelectOption from "./Select/SelectOption";
import Control from "./Control";
import ErrorModal from "./ErrorModal";

function App() {
  
  const [controls, setControls] = useState([]);
  const [selectedControlID, setSelectedControlID] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  const loadControls = useCallback(() => {
    setLoading(true)
    setError(false)
    axios
      .get(`${process.env.REACT_APP_MOACKAPI_URL}/controls`)
      .then(({ data }) => {
        console.log(data)
        setControls(data.data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      });
  }, []);

  useEffect(() => {
    loadControls();
  }, [loadControls]);

  return (
    <div className="mx-auto bg-gray-200 h-screen flex flex-col">
      <Header />
      <div className="flex-1 py-8 px-4 flex flex-col items-center mt-16">
        <div className="mb-8 max-w-lg w-full">
          <Card label="1. Select Control" loading={loading}>
            <Select
              label="Controls"
              disabled={controls.length === 0}
              onChange={(event) => setSelectedControlID(event.target.value)}
            >
              <SelectOption key="empty">Select...</SelectOption>
              {controls.map((control) => (
                <SelectOption value={control.id}>
                  {control.attributes.name}
                </SelectOption>
              ))}
            </Select>
          </Card>
        </div>
        <div className="mb-4 max-w-lg w-full">
          {selectedControlID && <Control id={selectedControlID} />}
        </div>
      </div>
      {error && (
        <ErrorModal onTryAgain={() => loadControls()}>
          unable to load controls
        </ErrorModal>
      )}
    </div>
  );
}

export default App;
