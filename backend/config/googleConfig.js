import {google} from 'googleapis'

const GOOGLE_CLIENT_ID = "72348332556-qnnvsjcj5jcsrfoa2n7632onuj09275o.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

export const  oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    CLIENT_SECRET,
    'postmessage'
)