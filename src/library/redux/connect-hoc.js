const createConnectHOC = 
  connect => 
    (mapStateToProps = state => ({})) => 
      (WrappedComponent) => 
        connect({
          mapStateToProps, 
          LayoutComponent: WrappedComponent
        });
export default createConnectHOC;


const createConnnectHOC2 = function(connect) {
  return function (const mapStateToProps = function(state){ return {}}) {
    return function(WrappedComponent) {
      return connect({
        mapStateToProps,
        LayoutComponent: WrappedComponent
      })
    }
  }
}
