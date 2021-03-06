import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ErrorLabel from '../../../../components/form/ErrorLabel';
import {
  selectLocationError,
  selectLocationData,
} from '../../../../selectors/location';
import { getService } from '../../../../selectors/service';
import * as actions from '../../../../actions';
import Header from '../../../../components/header';
import Button from '../../../../components/button';
import ProgressBar from '../../../../components/progressBar';
import LoadingLabel from '../../../../components/form/LoadingLabel';
import NavBar from '../../../../components/navBar';
import FieldItem from '../../locationInfo/FieldItem';

import { SERVICE_FIELDS } from '../../serviceForm/routes';

function ServiceHeader({ children }) {
  return (
    <div className="container px-4 py-4 text-left">
      <div className="row">
        <Header className="m-0">{children}</Header>
      </div>
    </div>
  );
}

const LoadingView = () => (
  <div className="d-flex flex-column">
    <NavBar title="Services Details" />
    <LoadingLabel>Loading service data...</LoadingLabel>
  </div>
);

function getUpdatedAt(service, metaDataSection, fieldName) {
  const subFields = service.metadata[metaDataSection];
  const field = subFields.find(el => el.field_name === fieldName);
  return field ? field.last_action_date : null;
}

function ListItem({ route, linkTo, service }) {
  const { label, metaDataSection, fieldName } = route;
  const updatedAt = getUpdatedAt(service, metaDataSection, fieldName);
  return <FieldItem title={label} linkTo={linkTo} updatedAt={updatedAt} />;
}

class ServiceDetails extends Component {
  componentDidMount() {
    if (Object.keys(this.props.service).length === 0) {
      const { locationId } = this.props.match.params;
      this.props.getLocation(locationId);
    }
  }

  onGoToDocs = () => {
    this.props.history.push(`${this.getServiceUrl()}/documents`);
  };

  getServiceUrl = () => {
    const { locationId, serviceId } = this.props.match.params;
    return `/team/location/${locationId}/services/${serviceId}`;
  };

  render() {
    const { service, locationData, locationError } = this.props;

    if (locationError) {
      return <ErrorLabel errorMessage={locationError} />;
    }

    if (!locationData ||
      Object.keys(locationData).length === 0 ||
      !service ||
      Object.keys(service).length === 0) {
      return <LoadingView />;
    }

    return (
      <div className="text-left d-flex flex-column">
        <NavBar
          backButtonTarget={`/team/location/${this.props.match.params.locationId}/services`}
          title="Service Details"
        />
        <ProgressBar step={0} steps={SERVICE_FIELDS.length} />
        <ServiceHeader>Check all the {service.name} details</ServiceHeader>

        {SERVICE_FIELDS.map(field => (
          <ListItem
            key={field.label}
            route={field}
            linkTo={`${this.getServiceUrl()}${field.urlFragment}`}
            service={service}
          />
        ))}
        <Button fluid primary onClick={this.onGoToDocs}>
          Go to docs required
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  service: getService(state, ownProps),
  locationData: selectLocationData(state, ownProps),
  locationError: selectLocationError(state, ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getLocation: bindActionCreators(actions.getLocation, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);
