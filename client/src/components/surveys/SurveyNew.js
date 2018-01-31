import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
  state = {showReivew: false};
  renderContent() {
    if(this.state.showReview) {
      return <SurveyReview
                onCancel={ () => this.setState({showReview: false})}
              />
    }
      return <SurveyForm
              onSurveySubmit ={() => this.setState({showReview: true})}
              />
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}
export default reduxForm({
  form:'SurveyForm'
})(SurveyNew);
