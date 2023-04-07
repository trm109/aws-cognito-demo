import * as dotenv from 'dotenv';
dotenv.config();
import AWS from 'aws-sdk'
import crypto from 'crypto'


class CognitoService {
    private config = {
        region: 'us-east-1',
    }
    //Provided from AWS
    private secretHash: string = ''
    //Provided from AWS
    private clientId: string = ''
    private cognitoIdentity: AWS.CognitoIdentityServiceProvider;
    constructor() {
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
    }

    public async signUp(username: string, password: string, userAttr: Array<any>): Promise<boolean> {
        const params = {
            ClientId: this.clientId,
            Password: password,
            Username: username,
            SecretHash: this.generateHash(username),
            userAttributes: userAttr
        };

        try {
            const data = await this.cognitoIdentity.signUp(params).promise();
            console.log(data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    private generateHash (username:string): string {

        return crypto.createHmac('sha256', this.secretHash)
            .update(username + this.clientId)
            .digest('base64');
    }
}

export default CognitoService;