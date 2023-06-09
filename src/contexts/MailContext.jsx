import { createContext, useReducer } from 'react';
import { mails } from '../data/Data';

export const mailContext = createContext()

 const mailReducer = (state, action) => {
    switch (action.type) {
        case 'delete':
            return {...state,
                mailsData : state.mailsData.filter((mail)=> mail.mId!==action.payload),
                deletedMails: [...state.deletedMails, state.mailsData.find((mail) => mail.mId === action.payload)]
            }
        case 'spam':
            return {...state,
                mailsData : state.mailsData.filter((mail)=> mail.mId!==action.payload),
                SpammedMails: [...state.SpammedMails, state.mailsData.find((mail) => mail.mId === action.payload)]
            }
        case 'markRead':
            return {...state,
                mailsData : state.mailsData.map((mail)=> mail.mId===action.payload ? {...mail,unread : !mail.unread }: mail)
            }
        case 'restore':
            return {...state,
                mailsData : [...state.mailsData, state.deletedMails.find((mail)=>mail.mId===action.payload )],
                deletedMails : state.deletedMails.filter((mail)=> mail.mId!==action.payload)
            }
        case 'notSpam':
            return {...state,
                mailsData : [...state.mailsData, state.SpammedMails.find((mail)=>mail.mId===action.payload )],
                SpammedMails : state.SpammedMails.filter((mail)=> mail.mId!==action.payload)
            }
        case 'star':
            return {...state,
                mailsData : state.mailsData.map((mail)=> mail.mId===action.payload ? {...mail,isStarred : !mail.isStarred }: mail)
            }

        default:
            return state;
    }
}

export const ContextProvider = ({ children }) => {

    const initialState = {
        // isUnread: false,
        // isStarred: false,
        mailsData: mails,
        deletedMails: [],
        SpammedMails: []
    }

    const [mailState, mailDispatch] = useReducer(mailReducer, initialState)
    console.log(mailState)

    return (
        <mailContext.Provider value={{ mailDispatch, mailState }}>
            {children}
        </mailContext.Provider>
    )
}