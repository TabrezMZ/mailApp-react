import { useContext ,useState} from "react"
import { Link } from "react-router-dom"
import {mailContext} from '..';



export const Inbox = () => {
    const { mailState,mailDispatch} = useContext(mailContext);
    const [isStared, setStared] = useState(false);
    const [isUnRead, setRead] = useState(false);


    const filteredMail = mailState?.mailsData.filter((mail) => {
        if (isUnRead && isStared) return mail.unread || mail.isStarred;
        if (isUnRead && !isStared) return mail.unread;
        if (!isUnRead && isStared) return mail.isStarred;
        if (!isUnRead && !isStared) return mail;
      });

      const unreadMail = filteredMail.filter((mail)=>!mail.unread)

    return(
        <div className="inbox">
        <div className="content">
            <h1>Mail Box</h1>
            <fieldset>
                <legend>Filters</legend>
                <label>
                    <input type="checkbox" onChange={() => setRead(!isUnRead)}  /> Show Unread Mails
                </label>
                <label>
                    <input type="checkbox" onChange={() => setStared(!isStared)}  /> Show Starred Mails
                </label>
            </fieldset>
            <h3 style={{textAlign: 'left', paddingLeft: '60px'}}>Unreads: {unreadMail.length}</h3>
            <ul>
                {filteredMail.map(mail => (
                    <>
                    <li key={mail.mId} style={{backgroundColor: mail.unread ? '#f5f5f4' : 'white', color: mail.unread ? 'gray' : 'black'}}>
                        <div className="header">
                            <h4>{mail?.subject}</h4>
                            <button onClick={() => mailDispatch({type: 'star', payload: mail.mId})}><i style={{color: mail.isStarred ? 'rgb(253, 213, 15)' : 'rgb(198, 193, 193)'}} class="fa-solid fa-star fa-lg"></i></button>
                        </div>
                        <p>{mail?.content}</p>
                        <div className="details">
                            <Link to={`/mails/${mail.mId}`}>View Details</Link>
                            <div className='buttons'>
                                <button style={{color: 'red'}} onClick={() => mailDispatch({type: 'delete', payload: mail.mId})}><i class="fa-solid fa-trash-can"></i></button>
                                <button style={{color: 'orange'}} onClick={() => mailDispatch({type: 'markRead', payload: mail.mId})}>{mail.unread ? <i class="fa-solid fa-envelope-open"></i> : <i class="fa-solid fa-envelope"></i>}</button>
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