import * as dotenv from 'dotenv';
dotenv.config();
//import AWS from 'aws-sdk'
//prisma



//Accesses a MySQL Database via AWS RDS. 
//Uses Prisma.
class RDSService {
    private config = {
        region: process.env.AWS_REGION,
    }

    constructor() {
        
    }

}

export default RDSService;