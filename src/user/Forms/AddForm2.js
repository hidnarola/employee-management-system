import React, { useState } from 'react';
import { Row, Col, Container, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components';
import axios from 'axios';
import { closeForm } from '../../utils/CloseForm';
import Select from 'react-select'

const addUrl = 'http://localhost:8080/api/add/employees/';


const colors = [
  { value: 'White', label: 'White' },
  { value: 'Yellow', label: 'Yellow' },
  { value: 'Orange', label: 'Orange' },
  { value: 'Red', label: 'Red' },
  { value: 'Green', label: 'Green' },
  { value: 'Blue', label: 'Blue' },
  { value: 'Brown', label: 'Brown' },
  { value: 'Purple', label: 'Purple' },
  { value: 'Black', label: 'Orange' },
]

const cities = [
  { value: 'Brampton', label: 'Brampton' },
  { value: 'Bolton', label: 'Bolton' },
  { value: 'Toronto', label: 'Toronto' },
  { value: 'Oakville', label: 'Oakville' },
  { value: 'Mississauga', label: 'Mississauga' },
  { value: 'Makham', label: 'Makham' },
  { value: 'Ottawa', label: 'Ottawa' },
];

const branches = [
  { value: 'Abacus', label: 'Abacus' },
  { value: 'Pillsworth', label: 'Pillsworth' },
  { value: 'Dundas', label: 'Dundas' },
  { value: 'Queen', label: 'Queen' },
  { value: 'King', label: 'King' },
]

const nameRegExpression = /^([a-zA-Z]+\s)*[a-zA-Z]+$/i;

const EmployeeSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(nameRegExpression, "Alphabets are allow only"),
  profession: Yup.string()
    .matches(nameRegExpression, "Alphabets are allow only")
    .required("Profession is required"),
  color: Yup.array()
    .required("Please select color"),
  city: Yup.array()
    .required("Please selet city"),
  branch: Yup.array()
    .required("Please select branch"),
  assigned: Yup.boolean()
});

function AddForm() {
  const [employee, setEmployee] = useState({
    name: '',
    profession: '',
    color: '',
    city: '',
    branch: '',
    assigned: false,
  });


  const onChangeName = event => {
    setEmployee({
      ...employee,
      name: event.target.value,
    });
    // setFormErrors(validate(employee));
  };
  // console.log('Error ->', formErrors)

  const onChangeProfession = event => {
    setEmployee({
      ...employee,
      profession: event.target.value,
    });
  };

  const onChangeColor = event => {
    setEmployee({
      ...employee,
      color: event.target.value,
    });
  };

  const onChangeCity = event => {
    setEmployee({
      ...employee,
      city: event.target.value,
    });
  };

  const onChangeBranch = event => {
    setEmployee({
      ...employee,
      branch: event.target.value,
    });
  };

  const isInputFieldEmpty = () => {
    return (
      employee.name === '' ||
      employee.profession === '' ||
      employee.color === '' ||
      employee.city === '' ||
      employee.branch === '' ||
      employee.assigned === null
    );
  };

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      color: values.color[0].value,
      city: values.city[0].value,
      branch: values.branch[0].value
    }
    axios.post(addUrl, payload).then(res => {
      console.log(res.data.data);
      closeForm();
    });
  };

  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <H6>
              Please fill out the form to add an employee and then click
              the submit button.
            </H6>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={9}>
            <Card>
              <StyledCardHeader>Add Employee</StyledCardHeader>
              <Card.Body>
                <Formik
                  initialValues={{
                    name: '',
                    profession: '',
                    color: '',
                    city: '',
                    branch: '',
                    assigned: false,
                  }}
                  validationSchema={EmployeeSchema}
                  /*
                  validate={(values) => {
                    let errors = {};
                    if (!values.name || values.name.trim() === "") {
                      errors.name = "First name is required";
                    }
                    if (
                      !/^([a-zA-Z]+\s)*[a-zA-Z]+$/i.test(
                        values.name.trim()
                      )
                    ) {
                      errors.name = "First name is not valid.";
                    }

                    if (!values.profession || values.profession.trim() === "") {
                      errors.profession = "First profession is required";
                    }
                    if (
                      !/^([a-zA-Z]+\s)*[a-zA-Z]+$/i.test(
                        values.profession.trim()
                      )
                    ) {
                      errors.profession = "First profession is not valid.";
                    }
                    return errors;
                  }}
                  */
                  onSubmit={(values) => {
                    console.log("Value ==>", values);
                    handleSubmit(values)
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                  }) => (
                      <Form noValidate onSubmit={handleSubmit}>
                        {/* {JSON.stringify(touched)}<br />
                        {JSON.stringify(errors)} */}
                        <Form.Group controlId="addName">
                          <Form.Label>Name</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Please enter full name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              // onChange={handleInputChange}
                              // onFocus={handleBlur}
                              isValid={touched.name && !errors.name}
                              isInvalid={touched.name && !!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="addProfession">
                          <Form.Label>Profession</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type="text"
                              name="profession"
                              placeholder="Please enter job title"
                              value={values.profession}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isValid={touched.profession && !errors.profession}
                              isInvalid={touched.profession && !!errors.profession}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.profession}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="addColor">
                          <Form.Label>Color</Form.Label>
                          <StyledSelect
                            error={touched.color && errors.color ? true : false}
                            success={touched.color && !errors.color ? true : false}
                            name="color"
                            isMulti
                            options={colors}
                            // onChange={(value) => console.log('vv->', value)}
                            onChange={selectedOption => {
                              let event = { target: { name: 'color', value: selectedOption } }
                              handleChange(event)
                            }}
                            value={values.color}
                            onBlur={handleBlur}
                          // isValid={touched.color && !errors.color}
                          // isInvalid={touched.color && !!errors.color}
                          />
                          <ErrorText>
                            {touched.color && errors.color}
                          </ErrorText>
                        </Form.Group>
                        <Form.Group controlId="addCity">
                          <Form.Label>City</Form.Label>
                          <StyledSelect
                            error={touched.city && errors.city ? true : false}
                            success={touched.city && !errors.city ? true : false}
                            name="city"
                            isMulti
                            options={cities}
                            onChange={selectedOption => {
                              let event = { target: { name: 'city', value: selectedOption } }
                              handleChange(event)
                            }}
                            onBlur={handleBlur}
                            value={values.city}
                          />
                          <ErrorText>
                            {touched.city && errors.city}
                          </ErrorText>
                        </Form.Group>
                        <Form.Group controlId="addBranch">
                          <Form.Label>Branch</Form.Label>
                          <StyledSelect
                            error={touched.branch && errors.branch ? true : false}
                            success={touched.branch && !errors.branch ? true : false}
                            name="branch"
                            isMulti
                            options={branches}
                            onChange={selectedOption => {
                              let event = { target: { name: 'branch', value: selectedOption } }
                              handleChange(event)
                            }}
                            onBlur={handleBlur}
                            value={values.branch}
                          />
                          <ErrorText>
                            {touched.branch && errors.branch}
                          </ErrorText>
                        </Form.Group>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => closeForm()}
                        >
                          Cancel
                      </Button>
                        <StyledButton
                          className="style-button"
                          size="sm"
                          type="submit"
                        // disabled={isInputFieldEmpty()}
                        // disabled={!isValid}
                        >
                          Submit
                        </StyledButton>
                      </Form>
                    )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;
`;

const H6 = styled.h6`
  margin-bottom: 10px;
  color: #858484;
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #3277b2;
  color: #ffffff;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  margin-left: 5px;
`;

const ErrorText = styled.p`
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
`;

const StyledSelect = styled(Select)`
  ${({ error }) => error && `border: 1px solid #dc3545;`}
  ${({ success }) => success && `border: 1px solid #28a745;`}
`;

export default AddForm;
