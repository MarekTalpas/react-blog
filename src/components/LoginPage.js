import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startLoginWithGoogle, startLoginWithFacebook } from '../actions/auth';

export const LoginPage = ({ startLoginWithGoogle, startLoginWithFacebook }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">React Blog</h1>
      <p className="box-layout__subtitle">Best Blog ever.</p>
      <button className="button google" onClick={startLoginWithGoogle}>Login with Google</button>
      <button className="button facebook" onClick={startLoginWithFacebook}>Login with Facebook</button>
    </div>
  </div>
);

LoginPage.defaultProps = {
  startLoginWithGoogle: () => {},
  startLoginWithFacebook: () => {}
};

LoginPage.propTypes = {
  startLoginWithGoogle: PropTypes.func,
  startLoginWithFacebook: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  startLoginWithGoogle: () => dispatch(startLoginWithGoogle()),
  startLoginWithFacebook: () => dispatch(startLoginWithFacebook())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
