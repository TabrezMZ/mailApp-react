import { useContext } from "react"
import { Link } from "react-router-dom"
import {mailContext} from '..';


export const Starred = () => {
    const { mailState,mailDispatch} = useContext(mailContext);
    const starred = mailState.mailsData.filter(mail => mail.isStarred)
    return(
        <div className="inbox">
            <div className="content">
                <h1>Starred</h1>
                {starred.length === 0 && <h3>No Starred Messages.</h3>}
                <ul>
                    {starred.map(mail => (
                        <>
                        <li key={mail.mId} className="lists" style={{backgroundColor: mail.unread ? '#f5f5f4' : 'white', color: mail.unread ? 'gray' : 'black'}}>
                            <div className="header">
                                <h4>{mail?.subject}</h4>
                                <button onClick={() => mailDispatch({type: 'star', payload: mail.mId})}><i style={{color: mail.isStarred ? 'rgb(253, 213, 15)' : 'rgb(198, 193, 193)'}} class="fa-solid fa-star fa-lg"></i></button>
                            </div>
                            <p>{mail?.content}</p>
                            <div className="details">
                                <Link to={`/mails/${mail.mId}`}>View Details</Link>
                                <div className='buttons'>
                                    <button style={{color: 'red'}} onClick={() => mailDispatch({type: 'delete', payload: mail.mId})}><i class="fa-solid fa-trash-can"></i></button>
                                    <button style={{color: 'orange'}} onClick={() => mailDispatch({type: 'markRead', payload: mail.mId})}>Mark as {mail.unread ? 'Unread' : 'Read'}</button>
                                    <button style={{color: 'green'}}  onClick={() => mailDispatch({type: 'spam', payload: mail.mId})}>Report Spam</button>
                                </div>
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