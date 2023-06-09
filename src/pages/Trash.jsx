import { useContext } from "react"
import { Link } from "react-router-dom"
import {mailContext} from '..';

export const Trash = () => {
    const { mailState,mailDispatch} = useContext(mailContext);
    return(
        <div className="inbox">
        <div className="content">
            <h1>Trash Box</h1>
            {mailState?.deletedMails.length === 0 && <h3>Nothing in Trash.</h3>}
            <ul>
                {mailState?.deletedMails.map(mail => (
                    <>
                    <li key={mail.mId} className="lists" style={{backgroundColor: mail.unread ? '#f5f5f4' : 'white', color: mail.unread ? 'gray' : 'black'}}>
                        <h4>{mail?.subject}</h4>
                        <p>{mail?.content}</p>
                        <div className="details">
                            <Link to={`/mails/${mail.mId}`}>View Details</Link>
                            <button style={{color: 'red'}} onClick={() => mailDispatch({type: 'restore', payload: mail.mId})}>Restore</button>
                        </div>
                        
                    </li>
                    <hr />
                    </>
                ))}
            </ul>
        </div>
    </div>
    )
}