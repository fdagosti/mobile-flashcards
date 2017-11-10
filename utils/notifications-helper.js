import {AsyncStorage} from "react-native"
import {Notifications, Permissions} from "expo"

const NOTIFICATION_KEY = "mobile-flashcard-notifications"

export function clearLocalNotifications(){

}

function createNotification() {
    return {
        title: "Start a quiz",
        body: "How about training yourself with a new quiz ?",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority : "high",
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
}