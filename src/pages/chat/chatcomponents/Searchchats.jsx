import { useState, useContext } from 'react';
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from '../../../context/AuthContext';
import { UsersContext } from '../../../context/UsersContext';
import { useMemo } from 'react';
import { BsChatDots } from 'react-icons/bs';

export const Searchchats = () => {
	const [username, setUsername] = useState('');
	// const [user, setUser] = useState({});
	const [notFound, setNotFound] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const { allUsers } = useContext(UsersContext);

	const [drop, setDrop] = useState('');
	const [dropList, setDropList] = useState([]);
	const mates = useMemo(() => {
		return allUsers.filter((user) => {
			return currentUser.matesList.includes(user.uid);
		});
	}, [currentUser.matesList, allUsers]);

	// const handleSearch = async () => {
	// 	// Create a reference to the Users collection
	// 	const usersRef = collection(db, 'users');
	// 	const q = query(usersRef, where('displayName', '==', username.toLowerCase()));
	// 	const querySnapshot = await getDocs(q);
	// 	setNotFound(querySnapshot.empty);
	// 	querySnapshot.forEach((doc) => {
	// 		if (currentUser.matesList.includes(doc.data().uid)) {
	// 			setUser(doc.data());
	// 		} else {
	// 			setNotFound(true);
	// 		}
	// 	});
	// };

	// const handleStartSearch = (e) => {
	// 	(e.code === 'Enter' || e.code === 'NumpadEnter') && handleSearch();
	// };
	document.onclick = (e) => {
		if (e.target.nodeName !== 'INPUT') {
			setDrop('');
		}
	};
	const handleSelect = async (user) => {
		console.log(currentUser);
		console.log(user);
		// 1st Check if the group (chats Collection) is exists in Firestore Or Not => if Not Create
		const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
		const res = await getDoc(doc(db, 'chats', combinedId));
		if (!res.exists()) {
			//Create Collection
			await setDoc(doc(db, 'chats', combinedId), { messages: [] });

			// Create User Chats [for The Owner with the searched User]
			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[combinedId + '.userInfo']: user,
				[combinedId + '.date']: serverTimestamp(),
			});

			// Create User Chats [for The searched User with the Owner]
			await updateDoc(doc(db, 'userChats', user.uid), {
				[combinedId + '.userInfo']: currentUser,
				[combinedId + '.date']: serverTimestamp(),
			});
		}

		// After Select User From Search

		setUsername('');
	};
	const dropDownSearch = (e) => {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			setDropList(mates.filter((mate) => mate.displayName.toLowerCase().indexOf(username.toLowerCase()) > -1));
		}
	};

	return (
		<div className='position-relative'>
			<div className='searchForm'>
				<input
					className='side_search w-75 p-2 '
					type='text'
					value={username}
					placeholder='Search For Mates'
					onKeyDown={dropDownSearch}
					onFocus={() => {
						setDrop('drop');
						setDropList(mates);
					}}
					// onBlur={() => setDrop('')}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			{/* {notFound && <span>username Not Found</span>}
			{user && (
				<div className="visible-section px-4 " onClick={handleSelect}>
					<div className="row py-2 g-3 d-flex align-items-center align-items-center ">
						<div className="col-9">
							<div className="row g-2">
								<div className="col-3 p-1">
									<img className="userChat_pic" src={user.photoURL} alt="UserPic" />
								</div>
								<div className="col-9 mt-0 py-2 ">
									<p className="fw-bold w-13">{user.displayName}</p>
								</div>
							</div>
						</div>
						<div className="col-3 p-0 mb-2">
							<button className="btn btn-outline-info follow rounded-1">--</button>
						</div>
					</div>
				</div>
			)} */}
			<div className={`mates-list position-absolute  shadow-lg rounded-3 p-2 ${drop}`}>
				{dropList.map((mate) => (
					<div
						key={mate.uid}
						className='pop-down-mate p-2 d-flex  justify-content-between align-items-center'
						onClick={() => {
							handleSelect(mate);
							setDrop('');
						}}>
						<div className='mate-pic w-25 rounded-circle'>
							<img src={mate.photoURL} alt={mate.displayName} />
						</div>
						<div className='mate-name w-50'>
							<small className='text-truncate text-capitalize'>{mate.displayName}</small>
						</div>
						<BsChatDots className='icon' />
					</div>
				))}
			</div>
		</div>
	);
};
