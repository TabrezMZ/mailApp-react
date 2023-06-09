import { useContext } from "react"
import { Link } from "react-router-dom"
import {mailContext} from '..';

export const Spam = () => {
    const { mailState,mailDispatch} = useContext(mailContext);
    return(
        <div className="inbox">
        <div className="content">
        <h1>Spam Folder</h1>
            {mailState?.SpammedMails.length === 0 && <h3>Nothing in Trash.</h3>}
            <ul>
                {mailState?.SpammedMails.map(mail => (
                    <>
                    <li key={mail.mId} className="lists" style={{backgroundColor: mail.unread ? '#f5f5f4' : 'white', color: mail.unread ? 'gray' : 'black'}}>
                        <h4>{mail?.subject}</h4>
                        <p>{mail?.content}</p>
                        <div className="details">
                            <Link to={`/mails/${mail.mId}`}>View Details</Link>
                            <button style={{color: 'green'}} onClick={() => mailDispatch({type: 'notSpam', payload: mail.mId})}>Not Spam</button>
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