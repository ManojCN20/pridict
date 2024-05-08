import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    kmDriven: "",
    fuel: "",
    sellerType: "",
    transmission: "",
    owner: "",
    mileage: "",
    engine: "",
    maxPower: "",
    seats: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    // Load the TensorFlow.js model
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel(
          "./random_forest_model.json"
        );
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading model:", error);
      }
    }
    loadModel();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make prediction with the model
      const inputTensor = tf.tensor([Object.values(formData)], [1, 11]);
      const prediction = model.predict(inputTensor);
      const price = prediction.arraySync()[0][0];
      setPredictedPrice(price.toFixed(2));
    } catch (error) {
      console.error("Error predicting price:", error);
    }
  };

  return (
    <div>
      <h2>Selling Price Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Year:
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>

        <label>
          Kilometers Driven:
          <input
            type="text"
            name="kmDriven"
            value={formData.kmDriven}
            onChange={handleChange}
          />
        </label>
        {/* Include input fields for other features */}
        <label>
          Fuel:
          <input
            type="text"
            name="fuel"
            value={formData.fuel}
            onChange={handleChange}
          />
        </label>
        <label>
          Seller Type:
          <input
            type="text"
            name="sellerType"
            value={formData.sellerType}
            onChange={handleChange}
          />
        </label>
        <label>
          Transmission:
          <input
            type="text"
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
          />
        </label>
        <label>
          Owner:
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
          />
        </label>
        <label>
          Mileage:
          <input
            type="text"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
          />
        </label>
        <label>
          Engine:
          <input
            type="text"
            name="engine"
            value={formData.engine}
            onChange={handleChange}
          />
        </label>
        <label>
          Max Power:
          <input
            type="text"
            name="maxPower"
            value={formData.maxPower}
            onChange={handleChange}
          />
        </label>
        <label>
          Seats:
          <input
            type="text"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Predict Price</button>
      </form>
      {predictedPrice && (
        <div>
          <h3>Predicted Selling Price:</h3>
          <p>{predictedPrice}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
