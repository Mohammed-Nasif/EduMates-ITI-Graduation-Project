import { Link } from "react-router-dom"
import coursesDB from './../../database/db.json';

export const Classroom = () => {
    let coursesID = Object.keys(coursesDB.courses);
    // console.log(coursesDB.courses[coursesID[0]].courseName);
  return (
    <div>
        <Link to={`/eduMates/classroom/${coursesDB.courses[coursesID[0]].courseName}/${coursesID[0]}`} className="p-3">Course 1</Link>
        <Link to={`/eduMates/classroom/${coursesDB.courses[coursesID[1]].courseName}/${coursesID[1]}`} className="p-3">Course 2</Link>
        <Link to={`/eduMates/classroom/${coursesDB.courses[coursesID[2]].courseName}/${coursesID[2]}`} className="p-3">Course 3</Link>
    </div>
  )
}
