const schema = {
    "properties": {
        "name": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100
        },
        "email": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100,
        },
        "message": {
            "type": "string",
            "minLength": 10,
            "maxLength": 255,
        }
    }
}

export default schema