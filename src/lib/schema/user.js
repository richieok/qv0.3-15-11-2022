export const User = {
    $jsonSchema: {
        bsonType: "object",
        title: "User Object Validation",
        required: ['username', 'email', 'firstname', 'lastname', 'password', 'created', 'lastUpdated', 'usercollectionname'],
        properties: {
            username: {
                bsonType: 'string',
            },
            firstname: {
                bsonType: 'string',
            },
            lastname: {
                bsonType: 'string',
            },
            email: {
                bsonType: 'string',
            },
            password: {
                bsonType: 'string',
            },
            created: {
                bsonType: 'date'
            },
            lastUpdated: {
                bsonType: 'date'
            },
            usercollectionname: {
                bsonType: 'string'
            }
        }
    }
} 