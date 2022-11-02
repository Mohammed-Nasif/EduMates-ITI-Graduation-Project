import pPhoto from '../../pp.jpg'
import cPhoto from '../../cp.jpg'
import Mate from './Mate'


const MatesList = () => {

    // simulating data
    const matesList = [
        {
            mateName: 'Samya Abdelrahman',
            description: 'student',
            coverPhoto: cPhoto ,
            profilePhoto: pPhoto
        },
        {
            mateName: 'Samya Abdelrahman',
            description: 'student',
            coverPhoto: cPhoto ,
            profilePhoto: pPhoto
        },
        {
            mateName: 'Samya Abdelrahman',
            description: 'student',
            coverPhoto: cPhoto ,
            profilePhoto: pPhoto
        },
        {
            mateName: 'Samya Abdelrahman',
            description: 'student',
            coverPhoto: cPhoto ,
            profilePhoto: pPhoto
        },
    ]
    return (
        <div className="MatesList ">
            <div className="row">
                {matesList.map((mate,i)=>{
                    return (
                        <div className='col'>
                            <Mate key={i}  name={mate.mateName} description={mate.description} cPhoto={mate.coverPhoto} pPhoto={mate.profilePhoto}></Mate>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MatesList
