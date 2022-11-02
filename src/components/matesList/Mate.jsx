import "./Mate.scss";

const Mate = (props) => {
    return (
        <div className="Mate">
            <div className="card">
                <div className="cover-photo">
                    <img className='w-100 h-100' src={props.cPhoto} alt="cover-photo" />
                </div>
                <div className="profile-photo text-center">
                    <img src={props.pPhoto} alt="profile-photo" />
                </div>
                <div className="text-wrapper text-center">
                    <p className='fw-bold'>{props.name}</p>
                    <p className='description'>{props.description}</p>
                </div>
                <div className='text-center mb-4 mt-3'>
                    <button className='btn btn-outline-danger'>Remove from list</button>
                </div>
            </div>
        </div>
    );
};

export default Mate;
