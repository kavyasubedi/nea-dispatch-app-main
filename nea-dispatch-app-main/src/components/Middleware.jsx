import { Component } from "react";
import { toast } from "react-toastify";

const withAuth = (WrappedComponent, allowedRoles) => {
  class WithAuth extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasCheckedAuth: false, // Add a state variable
      };
    }

    componentDidMount() {
      // Check if the user is authenticated (replace with your authentication logic)
      const isAuthenticated = true;

      // Check if the logic has already been executed
      if (this.state.hasCheckedAuth) {
        return;
      }

      // Retrieve the user's roles from local storage as a string
      const userRolesString = localStorage.getItem('userRoles');

      // Parse the user roles string into an array
      const userRolesArray = JSON.parse(userRolesString);


      // Check if the user has at least one role that matches any of the allowed roles
      const hasRequiredRole = userRolesArray.some((userRole) =>
        allowedRoles.includes(userRole)
      );

      if (!isAuthenticated || !hasRequiredRole) {
        // Redirect to a login page or show an unauthorized message
        if (window.location.pathname !== "/#dashboard") {
          toast.error(
            "Access Denied! You don't have permission to access this page."
          );
          window.location.href = "/#dashboard"; // Use window.location.href for redirect
        }
      }

      // Update the state to indicate that the logic has been executed
      this.setState({ hasCheckedAuth: true });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithAuth;
};

export default withAuth;