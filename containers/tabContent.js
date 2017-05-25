import {connect} from 'react-redux';
import TabContent from '../components/tabContent';
import {mapStateToProps} from '../containers/tabTitle';

const mapDispatchToProps = () => ({});

const TabContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TabContent);


export default  TabContentContainer;