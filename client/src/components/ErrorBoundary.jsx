import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(p){ super(p); this.state = { hasError:false, err:null }; }
  static getDerivedStateFromError(err){ return { hasError:true, err }; }
  componentDidCatch(err, info){ console.error('UI error:', err, info); }
  render(){
    if (this.state.hasError) {
      return <div className="card"><h3>Something went wrong</h3><p>Check DevTools console for details.</p></div>;
    }
    return this.props.children;
  }
}
