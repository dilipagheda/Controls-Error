import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Input from "./Input";
import Button from "./Button";
import Card from "./Card";
import ErrorModal from "./ErrorModal";

export default ({ id }) => {
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [maximumRabiRate, setMaximumRabiRate] = useState("");
  const [polarAngle, setPolarAngle] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_MOACKAPI_URL}/controls/${id}`)
      .then(({ data }) => {
        setName(data.data.attributes.name);
        setType(data.data.attributes.type);
        setMaximumRabiRate(data.data.attributes.maximum_rabi_rate);
        setPolarAngle(data.data.attributes.polar_angle);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = useCallback(
    (event, set) => {
      if (!dirty) {
        setDirty(true);
      }

      set(event.target.value);
    },
    [dirty],
  );

  const handleSubmit = useCallback(
    (event) => {
      if (!dirty) {
        return;
      }

      setLoading(true);
      setHasError(false);
      axios
        .put(`${process.env.REACT_APP_MOACKAPI_URL}/controls/${id}`, {
          type: "controls",
          id,
          attributes: {
            name,
            type,
            maximum_rabi_rate: maximumRabiRate,
            polar_angle: polarAngle,
          },
        })
        .then(({ data }) => {
          setName(data.data.attributes.name);
          setType(data.data.attributes.type);
          setMaximumRabiRate(data.data.attributes.maximum_rabi_rate);
          setPolarAngle(data.data.attributes.polar_angle);
        })
        .catch(() => setHasError(true))
        .finally(() => setLoading(false));
      event && event.preventDefault();
    },
    [id, maximumRabiRate, polarAngle, name, type, dirty],
  );

  return (
    <>
      <Card label="2. Update Control" loading={loading}>
        <form onSubmit={handleSubmit()}>
          <Input
            type="text"
            label="Name"
            disabled={!id}
            value={name}
            onChange={(event) => handleChange(event, setName)}
          />
          <Input
            type="text"
            label="Type"
            disabled={!id}
            value={type}
            onChange={(event) => handleChange(event, setType)}
          />
          <Input
            type="number"
            label="Maximum Rabi Rate"
            disabled={!id}
            value={maximumRabiRate}
            onChange={(event) => handleChange(event, setMaximumRabiRate)}
          />
          <Input
            type="number"
            label="Polar Angle"
            disabled={!id}
            value={polarAngle}
            onChange={(event) => handleChange(event, setPolarAngle)}
          />
          <Button
            disabled={!id}
            className="mt-2"
            Component="input"
            type="submit"
            value="update"
          />
        </form>
      </Card>
      {hasError && (
        <ErrorModal onTryAgain={() => handleSubmit()}>
          unable to save control
        </ErrorModal>
      )}
    </>
  );
};
