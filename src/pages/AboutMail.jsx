import { useParams } from "react-router-dom"
import {mails} from '../data/Data'

export const AboutMail = () => {
    const {mailId} = useParams();
    const findMail = mails.find(mail => mail.mId === mailId);
    return(
        <div className='inbox'>
        <div className="content">
            <h1>Details</h1>
            <div className='lists-details'>
                <h4>{findMail?.subject}</h4>
                <p>{findMail?.content}</p>
            </div>
            
        </div>
    </div>
    )
}