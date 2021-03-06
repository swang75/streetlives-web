import React from 'react';
import { SignUp } from 'aws-amplify-react';
import Input from '../../components/input';
import Button from '../../components/button';
import { Grid, Row, Col } from '../../components/layout/bootstrap';

export default class StreetlivesSignUp extends SignUp {
  showComponent(theme) {
    const { authState } = this.props;
    if (authState !== 'signUp') {
      return null;
    }

    return (
      <Grid>
        <Row>
          <Col customClasses="sign-in-header">
            <div>
              Streetlives <strong>NYC</strong>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Sign Up</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="w-100" htmlFor="username">Username</label>
            <Input
              fluid
              placeholder="Enter your username"
              id="username"
              key="username"
              name="username"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="w-100" htmlFor="password">Password</label>
            <Input
              fluid
              placeholder="Enter your password"
              id="password"
              key="password"
              name="password"
              type="password"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="w-100" htmlFor="email">Email</label>
            <Input
              fluid
              placeholder="Enter your email"
              id="email"
              key="email"
              name="email"
              type="email"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="w-100" htmlFor="phone">Phone Number</label>
            <Input
              fluid
              placeholder="Enter your phone number"
              id="phone"
              key="phone_number"
              name="phone_number"
              type="phone_number"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button primary onClick={this.signUp}>
              <span>Sign Up</span>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              className="default"
              onClick={() => this.changeState('signIn')}
            >
                Want to go back to sign in? Click here
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              className="default"
              onClick={() => this.changeState('confirmSignUp')}
            >
              Already signed up? Click here to enter your confirm code
            </button>
          </Col>
        </Row>
      </Grid>
    );
  }
}
