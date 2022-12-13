export const Session = {
    $jsonSchema: {
        bsonType: "object",
        title: "Session Object Validation",
        required: ['sessionId', 'ttl', 'startTime'],
        properties: {
            sessionId: {
                bsonType: 'string',
            },
            ttl: {
                bsonType: 'int',
            },
            startTime: {
                bsonType: 'date'
            }
        }
    }
}