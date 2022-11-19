import './App.css';
import BarChart from './components/bar-chart/BarChart';
import QuestionDataForm from './components/question-data-form/QuestionDataForm';
import Vote from './components/vote/Vote';

function App() {
  return (
    <>
      <div className='voting-header'>
        <h1>Sir vote-a-lot</h1>
      </div>
      <div className='voting'>
        <div className='voting-section col-md-4'>
          <QuestionDataForm></QuestionDataForm>
        </div>
        <div className='voting-section col-md-3'>
          <Vote></Vote>
        </div>
        <div className='voting-section col-md-5'>
          <BarChart></BarChart>
        </div>
      </div>
    </>
  );
}

export default App;
