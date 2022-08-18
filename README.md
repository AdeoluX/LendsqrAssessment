# Lendsqr Assessment

Microservice template (MySQL/SQL) with Knex ORM and Generic response and Error handler

## Testing Proceedure

```
## Ensure to create different users and accounts first to start testing.
```

## End Points

- endpoint to create user `POST` `${base_url}/user/api/v1/create-user`

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string"
}
```

- endpoint to get all user `GET` `${base_url}/user/api/v1/all-user`

- endpoint to create user `GET` `${base_url}/user/api/v1/user_id`

- endpoint to create account `POST` `${base_url}/user/api/v1/create-account/:user_id`

```json
{
  "amount": "number" //<optional>
}
```

- endpoint to fund account `POST` `${base_url}/user/api/v1/fund/:user_id`

```json
{
  "amount": "number",
  "account_number": "string"
}
```

- endpoint to get withdraw funds `POST` `${base_url}/user/api/v1/withdraw/:user_id`

```json
{
  "amount": "number",
  "account_number": "string"
}
```

- endpoint to transfer funds `POST` `${base_url}/user/api/v1/transfer/:user_id`

```json
{
  "account_number": "string",
  "receipient": "string",
  "account_to": "string",
  "amount": "number"
}
```

## Routes

- Route with auth middleware requires faux token

- For authenticated routes, tokens should be present in the Authorization header as such
  `Authorization: Bearer sampleusertoken`
- Success response is in the format

```json
{
    "status": 200,
    "success": true,
    "message": "success",
    "data": [
        {
            ...
        }
    ]
}
```

- Error response is in the format

```json
{
    "status": <error_code>,
    "success": false,
    "message": "Sample error message",
    "data": []
}
```

- Responses with status code 422 (validation errors) will contain a JSON object as message, describing the errors for each field

```json
{
  "status": 422,
  "success": false,
  "message": {
    "custom_field_1": [
      "Validation error message for custom_field_1",
      "Another validation error message for custom_field_1"
    ],
    "custom_field_2": ["Validation error message for custom_field_2"]
  },
  "data": []
}
```
