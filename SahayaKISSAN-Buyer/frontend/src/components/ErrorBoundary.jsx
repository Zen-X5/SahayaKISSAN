import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("REAL ERROR ↓↓↓");
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <pre style={{ color: "red", padding: 20 }}>
          {this.state.error?.message || "Unknown error"}
        </pre>
      );
    }
    return this.props.children;
  }
}
