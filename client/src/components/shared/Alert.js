import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Alert = ({ alerts }) => (
  <div className="alert-wrapper alert-wrapper-main">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
        {alert.alertType.length > 0 && alert.alertType === "danger"
          ? setTimeout(() => {
              <Redirect to="/login" />;
            }, 5000)
          : ""}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
