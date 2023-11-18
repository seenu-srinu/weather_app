import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { HOST } from "./confit";
import { useForm } from "react-hook-form";

const Weather_report = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
   {weatherReport(latitude, longitude)};

  const onchange = (event) => {
    setCoordinates({ ...coordinates });
  };
  const [coordinates, setCoordinates] = useState(null);
  console.log("coordinates", coordinates);

  const [latitude, setLatitude] = useState("");
  console.log("latitude", latitude);
  const [longitude, setLongitude] = useState("");
  console.log("longitude", longitude);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      weatherReport(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  const weatherReport = async (lat, long) => {
    try {
      let fetchProm = await fetch(HOST + "q=" + lat + "," + long);
      let fetchedRes = await fetchProm.json();
      console.log("Result", fetchedRes);
      setCoordinates(fetchedRes);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <form>
    <section
      className="vh-100"
      style={{
        backgroundColor: "#4B515D",
        marginBottom: "3",
        paddingTop: "22px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <container height="100vh" width="100vh" style={{ spacing: "2px" }}>
          <Row>
            <Col paddingLeft="px">
              <h1 className="heading">weather Report...!</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FloatingLabel
                controlId="floatingInput"
                label="latitude"
                className="mb-3"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              >
                <input type="latitude" placeholder="name@example.com" class={errors.latitude?"form-control is-invalid":"form-control"} {...register("latitude",{required:"*Required latitude"})} />
                {errors.latitude && (<p style={{ marginTop: "0px", fontSize: "12px", color: "red" }}>{errors.latitude.message}</p>)}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="longitude"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              >
                <input type="longitude" placeholder="Password"  class={errors.longitude?"form-control is-invalid":"form-control"} {...register("longitude",{required:"*Required longitude"})}/ >
              {errors.longitude && (<p style={{ marginTop: "0px", fontSize: "12px", color: "red" }}>{errors.longitude.message}</p>)}
              </FloatingLabel>
            </Col>
            <Row>
              <Col md={12} mt-10 textAlign="center">
                <Button
                  color="aqua"
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit(onSubmit)}
                >
                  Enter Here
                </Button>
              </Col>
            </Row>
          </Row>
        </container>
      </div>
      {coordinates ? (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div
                className="card"
                style={{ color: "#4B515D", borderRadius: 35 }}
              >
                <div className="card-body p-4">
                  <div className="d-flex">
                    <h6 className="flex-grow-1">{coordinates.location.name}</h6>
                    <h6>15:07</h6>
                  </div>
                  <div className="d-flex flex-column text-center mt-5 mb-4">
                    <h6
                      className="display-4 mb-0 font-weight-bold"
                      style={{ color: "#1C2331" }}
                    >
                      {" "}
                      {coordinates.current.temp_c}°C{" "}
                    </h6>
                    <span className="small" style={{ color: "#868B94" }}>
                      {coordinates.current.condition.text}
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                      <div>
                        <i
                          className="fas fa-wind fa-fw"
                          style={{ color: "#868B94" }}
                        />{" "}
                        <span className="ms-1">
                          {" "}
                          {coordinates.current.wind_kph}km/h
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-tint fa-fw"
                          style={{ color: "#868B94" }}
                        />{" "}
                        <span className="ms-1">
                          {" "}
                          {coordinates.current.cloud}%{" "}
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-sun fa-fw"
                          style={{ color: "#868B94" }}
                        />{" "}
                        <span className="ms-1">
                          {coordinates.current.wind_kph}h{" "}
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                        width="100px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        " "
      )}
    </section>
    </form>
  );
};

export default Weather_report;
