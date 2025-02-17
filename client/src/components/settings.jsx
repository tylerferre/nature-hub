import {useContext, useState} from "react";
import { UserContext } from "../context/UserProvider";

const Settings = () => {

    const {Settings, logout} = useContext(UserContext);


        const [copySuccess, setCopySuccess] = useState(false)
    
        const copyToClip = async () => {
            await navigator.clipboard.writeText(location.href);

            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
            
        }

    return (
        <div className="settings">
            <h2>Settings</h2>
            <ul className="settings-list">
                <button onClick={Settings}><li>Back</li></button>
                <hr />
                <button><li>Edit Profile</li></button>
                <hr />
                <button><li>Item</li></button>
                <hr />
                <button onClick={() => {
                    setCopySuccess(true);
                    copyToClip();
                }}><li>{copySuccess ? 'URL Copied' : 'Share'}</li></button>
                <hr />
                <button><li>Item</li></button>
                <hr />
                <button style={{color: "red"}} onClick={() => {
                    Settings();
                    logout();
                }}><li>Logout</li></button>
                <hr />
            </ul>
        </div>
    )
}

export default Settings;