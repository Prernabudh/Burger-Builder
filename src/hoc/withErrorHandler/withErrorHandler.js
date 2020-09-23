import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxx/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    useEffect(() => {
      axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          setError(error);
        }
      );
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };
    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}></WrappedComponent>
      </Aux>
    );
  };
};

export default withErrorHandler;
