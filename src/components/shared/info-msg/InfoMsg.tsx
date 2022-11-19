import './InfoMsg.css';

const InfoMsg = (props: any) => {
  return (
    <div className='info-msg'>
      <div title={props.message} className='info-msg-circle'>
        i
      </div>
    </div>
  );
};

export default InfoMsg;
