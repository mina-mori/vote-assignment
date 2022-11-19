import { useEffect, useRef, useState } from 'react';
import {
  setQuestion,
  addtOptions,
  editOption,
  valuesSelector,
  deleteOption,
  resetOptions,
} from '../../store/ValuesSlice';
import { useDispatch, useSelector } from 'react-redux';
import './QuestionDataForm.css';
import { OptionModel } from '../../models/OptionModel';
import InfoMsg from '../shared/info-msg/InfoMsg';
const QuestionDataForm = () => {
  const dispatch = useDispatch();
  const questionRef = useRef<any>();
  const newOptionRef = useRef<any>();
  const { values } = useSelector(valuesSelector);
  const [allOptions, setAllOptions] = useState<OptionModel[]>([]);
  const [questionValue, setQuestionValue] = useState<string>('');
  const [displayAddNewOption, setDisplayAddNewOption] =
    useState<boolean>(false);
  const [newOption, setNewOption] = useState<OptionModel>({
    id: 0,
    text: '',
    voteCount: 0,
  });
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const [successMsg, setSuccessMsg] = useState<string | undefined>();
  const [deleteMsg, setDeleteMsg] = useState<string | undefined>();

  useEffect(() => {
    setAllOptions(values ? values.options : []);
  }, [values]);
  const questionOnChange = (event: any) => {
    if (event.target?.value || event.target?.value == '') {
      setQuestionValue(event.target?.value);
    }
  };
  const addQuestion = () => {
    if (questionValue == '') {
      setErrorMsg('Please enter a valid value!');
      setTimeout(() => {
        setErrorMsg(undefined);
      }, 2000);
      questionRef.current?.classList.add('error-input');
    } else {
      questionRef.current?.classList.remove('error-input');
      setDisplayAddNewOption(true);
      dispatch(setQuestion(questionValue));
      setSuccessMsg('Value saved successfully.');
      setTimeout(() => {
        setSuccessMsg(undefined);
      }, 2000);
    }
  };
  const newOptionOnChange = (event: any) => {
    if (event.target?.value || event.target?.value == '') {
      const value: OptionModel = {
        id: 0,
        text: event.target.value,
        voteCount: 0,
      };
      setNewOption(value);
    }
  };
  const addNewOption = () => {
    const exists = allOptions.find(
      (option: OptionModel) => option.text == newOption.text
    );
    if (exists) {
      setErrorMsg('The value you have entered already exists!');
      newOptionRef.current?.classList.add('error-input');
      setTimeout(() => {
        setErrorMsg(undefined);
      }, 2000);
    } else {
      if (newOption?.text != '') {
        newOptionRef.current?.classList.remove('error-input');
        if (allOptions.length == 0) {
          newOption.id = 1;
        } else {
          newOption.id = allOptions.slice(-1)[0].id + 1;
        }
        setAllOptions([...allOptions, newOption]);
        dispatch(addtOptions(newOption));
        setNewOption({ id: 0, text: '', voteCount: 0 });
        setSuccessMsg('Value saved successfully.');
        setTimeout(() => {
          setSuccessMsg(undefined);
        }, 2000);
      } else {
        setErrorMsg('Please enter a valid value!');
        setTimeout(() => {
          setErrorMsg(undefined);
        }, 2000);
        newOptionRef.current?.classList.add('error-input');
      }
    }
  };
  const existingOptionOnChange = (event: any, option: OptionModel) => {
    let newOptions = [...allOptions];
    const index = newOptions.findIndex((o) => o.id == option.id);
    if (index != -1) {
      newOptions[index] = {
        id: option.id,
        text: event.target.value,
        voteCount: option.voteCount,
      };
      setAllOptions(newOptions);
    }
  };
  const updateExistingOption = (event: any, newOption: OptionModel) => {
    if (event.key === 'Enter') {
      event.target?.classList.remove('error-input');
      if (event.target?.value != '') {
        const exists = allOptions.find(
          (option: OptionModel) =>
            option.text == newOption.text && option.id != newOption.id
        );
        if (exists) {
          setErrorMsg('The value you have entered already exists!');
          setTimeout(() => {
            setErrorMsg(undefined);
          }, 2000);
          event.target?.classList.add('error-input');
        } else {
          const payload = {
            id: newOption.id,
            text: event.target?.value,
          };
          dispatch(editOption(payload));
          setSuccessMsg('Value saved successfully.');
          setTimeout(() => {
            setSuccessMsg(undefined);
          }, 2000);
        }
      } else {
        setErrorMsg('Enter a valid value!');
        setTimeout(() => {
          setErrorMsg(undefined);
        }, 2000);
        event.target?.classList.add('error-input');
      }
    }
  };
  const deleteSelectedOption = (id: number) => {
    let list = allOptions.filter((v) => v.id != id);
    setAllOptions(list);
    dispatch(deleteOption(id));
    setDeleteMsg('Value deleted successfully.');
    setTimeout(() => {
      setDeleteMsg(undefined);
    }, 2000);
  };
  const resetAll = () => {
    setQuestionValue('');
    setAllOptions([]);
    dispatch(resetOptions());
    dispatch(setQuestion(''));
    setNewOption({ id: 0, text: '', voteCount: 0 });
    setDisplayAddNewOption(false);
    questionRef.current?.classList.remove('error-input');
    newOptionRef.current?.classList.remove('error-input');
  };
  return (
    <div className='values-form'>
      <div>
        {allOptions?.length < 2 && (
          <div className='alert-info'>
            Please add at least 2 answers for the question!
          </div>
        )}
        {errorMsg && <div className='alert-error'>{errorMsg}</div>}
        {successMsg && <div className='alert-success'>{successMsg}</div>}
        {deleteMsg && <div className='alert-success'>{deleteMsg}</div>}
        <div className='col-md-9'>
          <input
            ref={questionRef}
            maxLength={80}
            className='question-input'
            type='text'
            placeholder='Type a questsion'
            value={questionValue}
            onChange={questionOnChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addQuestion();
            }}
          ></input>
          <InfoMsg message={'Press "Enter" to save value.'}></InfoMsg>
        </div>
        <div className='entered-values'>
          {allOptions &&
            allOptions?.length > 0 &&
            allOptions?.map(function (option: OptionModel, index: number) {
              return (
                <div className='row value-section' key={`value_${index}`}>
                  <div className='col-md-9'>
                    <input
                      maxLength={80}
                      type='text'
                      className='value-text'
                      value={option.text}
                      onChange={(event) =>
                        existingOptionOnChange(event, option)
                      }
                      onKeyDown={(event) => updateExistingOption(event, option)}
                    ></input>
                    <InfoMsg message={'Press "Enter" to save value.'}></InfoMsg>
                  </div>
                  <div className='col-md-3'>
                    <button
                      className='red-btn'
                      onClick={() => deleteSelectedOption(option.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {displayAddNewOption && allOptions.length < 10 && (
          <div className='row value-section'>
            <div className='col-md-9'>
              <input
                ref={newOptionRef}
                maxLength={80}
                type='text'
                placeholder='Type an answer'
                className='value-text'
                value={newOption.text}
                onChange={newOptionOnChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addNewOption();
                }}
              ></input>
              <InfoMsg message={'Press "Enter" to save value.'}></InfoMsg>
            </div>
            <div className='col-md-3'>
              <button className='green-btn' onClick={addNewOption}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='row values-footer'>
        <div className='col-md-9'>
          {allOptions ? allOptions.length : '0'}/10 posible answers
        </div>
        <div className='col-md-3'>
          {displayAddNewOption && (
            <button className='orange-btn' onClick={resetAll}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default QuestionDataForm;
