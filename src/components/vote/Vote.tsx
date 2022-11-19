import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionModel } from '../../models/OptionModel';
import { increaseVote, valuesSelector } from '../../store/ValuesSlice';
import './Vote.css';

const Vote = () => {
  const [selectedVote, setSelectedVote] = useState<number>(0);
  const { question, options } = useSelector(valuesSelector);
  const dispatch = useDispatch();
  const addVote = () => {
    if (selectedVote != 0) {
      dispatch(increaseVote(selectedVote));
      setSelectedVote(0);
    }
  };
  const trimText = (text: string) => {
    if (text?.length > 25) {
      return text.substring(1, 25) + '...';
    } else return text;
  };
  return question && options?.length >= 2 ? (
    <div className='vote'>
      <div>
        <div>
          <h2>{question}</h2>
        </div>
        <div>
          {options.map(function (value: OptionModel, index: number) {
            return (
              <div className='row value-option' key={`value_${index}`}>
                <input
                  type='radio'
                  name='vote-group'
                  title={value.text}
                  checked={selectedVote == value.id}
                  onChange={() => setSelectedVote(value.id)}
                />
                <span title={value.text}>{trimText(value.text)}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className='vote-footer-button'>
        <button onClick={addVote} disabled={selectedVote == 0}>
          Vote
        </button>
      </div>
    </div>
  ) : (
    <div className='no-data'>No data found</div>
  );
};

export default Vote;
