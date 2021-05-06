# List of API's

Return Codes Similar for all Api's
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 405 | `METHOD NOT ALLOWED` |
| 500 | `INTERNAL SERVER ERROR` |

Response Codes Similar for all Api's response body
| Status Code | Description |
| :--- | :--- |
| 1 | `SUCCESS` |
| -number | `CUSTOM CODE DECLEARED AS PER THE USAGE` |

## Container Api's

Container is stored as a document in the database.

```json
{
    "_id": "MongoDB Object ID",
    "links": [],
    "children": [],
    "containerId": "Container Unique Id based on UUID4",
    "name": "Container Name string Max: 120 Chars",
    "description": "Container Description string Max: 2048 Chars",
    "parentId": "Container ID of the parent Container",
    "userId": "User ID of the owner of the container",
    "createdAt": "Created TimeStamp",
    "updatedAt": "Last Updated TimeStamp",
    "__v": 0
}
```

1. ### Add Container

    - Method `PUT`
    - Description `Add Container api route`
    - Url <i>`/addContainer`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `containerName` Name of the Container to be Added
        - `containerDescription` Description of the Container to be Added
        - `parentId` Id of the parent container to be appended; Empty if no parent node exists
        - `userId` Id of the user; owner of the container
        ```json
        {
            "containerName": "<Container Name>",
            "containerDescription": "<Container Description>",
            "parentId": "<Parent Id>",
            "userId": "User Id"
        }
        ```
    - Success Response
        ```json
        {
            "code": 1,
            "message": "Successfully Created Container",
            "data": {
                "containerId": "<Container Id>",
                "name": "<Container Name>",
                "description": "<Container Description>",
                "parentId": "<Parent Id>",
                "links": [],
                "children": [],
                "createdAt": "<Created TimeStamp>",
                "updatedAt": "<Last Updated TimeStamp>"
            }
        }
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "code": "Status Code (Negative Integer)",
                    "message": "Error Message"
                }
            ]
        }
        ```

2. ### Edit Container

    - Method `PATCH`
    - Description `Edit Container api route`
    - Url <i>`/editContainer`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `containerName` Name of the Container to be Updated
        - `containerDescription` Description of the Container to be Updated
        - `containerId` Id of the container to update the above data
        ```json
        {
            "containerName": "<Container Name>",
            "containerDescription": "<Container Description>",
            "containerId": "<Container Id>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "code": "Status Code (Negative Integer)",
                    "message": "Error Message"
                }
            ]
        }
        ```

3. ### Delete Container

    - Method `DELETE`
    - Description `Delete Container api route`
    - Url <i>`/deleteContainer`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `containerId` Id of the container to delete
        ```json
        {
            "containerId": "<Container Id>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

4. ### Get Container Info

    - Method `GET`
    - Description `Get Container api route`
    - Url <i>`/getContainer`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `containerId` Id of the container
        ```json
        {
            "containerId": "<Container Id>"
        }
        ```
    - Success Response
        - `status` positive number `1` for the sucessful return of the api.
        - `message` message denoting the sucessful return of the api.
        - `data` return data requested by the client from the api.
        ```json
        {
            "code": 1,
            "message": "Fetched Container Data Sucessfully",
            "data": {
                "links": ["List of link objects"],
                "children": ["List of Id's of Children"],
                "containerId": "Container ID",
                "name": "Name of the container",
                "parent": "Parent ID",
                "createdAt": "Created Time",
                "updatedAt": "Last Updated Time"
            }
        }
        ```
    - Error Response
        - `status` negative status code as per the error.
        - `message` detailed information of the error.
        ```json
        {
            "code": "Status Code",
            "message": "Error Message"
        }
        ```

5. ### Get All Containers
    - Method `GET`
    - Description `Get All Containers api route`
    - Url <i>`/getAllContainers`</i>
    - Url Parameters
        - None
    - Body Parameters
        - None
    - Success Response
        - `status` positive number `1` for the sucessful return of the api.
        - `message` message denoting the sucessful return of the api.
        - `data` return data requested by the client from the api (List of all the containers).
        ```json
        {
            "code": 1,
            "message": "Fetched Container Data Sucessfully",
            "data": [
                {
                    "links": ["List of link objects"],
                    "children": ["List of Id's of Children"],
                    "containerId": "Container ID",
                    "name": "Name of the container",
                    "parent": "Parent ID",
                    "createdAt": "Created Time",
                    "updatedAt": "Last Updated Time"
                }
            ]
        }
        ```
    - Error Response
        - `status` negative status code as per the error.
        - `message` detailed information of the error.
        ```json
        {
            "code": "Status Code",
            "message": "Error Message"
        }
        ```

## Links Api's

The links are stored as objects inside the respective parent containers. The individual link object is shown below.

```json
{
    "linkId": "Link Unique Id based on UUID4",
    "Url": "Url of the Link to be stored. Max: 2048 Characters",
    "name": "Link Name string Max: 120 Chars",
    "createdAt": "Created TimeStamp",
    "updatedAt": "Last Updated TimeStamp"
}
```

1. ### Update Link
    - Method `PATCH`
    - Description `Edit Link api route`
    - Url <i>`/editLink`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `linkId` Name of the Container to be Updated
        - `name` Name of the Link to be Updated
        - `url` url of the Link to be Updated
        - `containerId` Id of the container to update the above data
        ```json
        {
            "linkId": "<Link Id>",
            "name": "<Name of the link>",
            "url": "<Url of the link>",
            "containerId": "<Container Id>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

## User Api's

User is stored as a document in the database.

```json
{
    "_id": "MongoDB Object ID",
    "userId": "User Unique Id based on UUID4 Unique",
    "firstName": "First Name string Max: 120 Chars",
    "lastName": "Last Name string Max: 120 Chars",
    "email": "Email string Max: 120 Chars Unique",
    "password": "Password HashString SHA-512",
    "passwordResetToken": "Password reset token",
    "passwordResetExpires": "Password reset expires timestamp",
    "emailVerificationToken": "Email verification token",
    "emailVerified": "Email Verified Boolean",
    "createdAt": "Created TimeStamp",
    "updatedAt": "Last Updated TimeStamp",
    "__v": 0
}
```

1. ### Add User

    - Method `PUT`
    - Description `Add User api route`
    - Url <i>`/addUser`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `firstName` First Name of the User to be Added
        - `lastName` Last Name of the User to be Added
        - `email` Email of the User to be Added `unique`
        - `password` PlainText Min `8` Characters
        - `confirmPassword` PlainText to match `password`
        ```json
        {
            "firstName": "<First Name>",
            "lastName": "<Last Name>",
            "email": "<Email>",
            "password": "<Password>",
            "confirmPassword": "<confirm Password>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

2. ### Edit User

    - Method `PATCH`
    - Description `Edit User api route`
    - Url <i>`/editUser`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `firstName` First Name of the User to be Added
        - `lastName` Last Name of the User to be Added
        - `userId` Id of the user to update the above data
        ```json
        {
            "firstName": "<First Name>",
            "lastName": "<Last Name>",
            "userId": "<User ID>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

3. ### Change User Password

    - Method `PATCH`
    - Description `Edit User Password api route`
    - Url <i>`/editUserPassword`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `currentPassword` Current Password of the User
        - `newPassword` New Password of the User
        - `userId` Id of the user to update the above data
        ```json
        {
            "firstName": "<First Name>",
            "lastName": "<Last Name>",
            "userId": "<User ID>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

4. ### Generate Forgot Password Link

    - Method `GET`
    - Description `Generate Forgot Password Link route`
    - Url <i>`/forgotPassword`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `email` Email of the User
        ```json
        {
            "email": "<Email>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

5. ### Verify and Reset Password
    - Method `PATCH`
    - Description `Verify and Update User Password api route`
    - Url <i>`/resetPassword`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `email` Email of the User
        - `newPassword` New Password of the User
        - `token` Reset Password Token
        ```json
        {
            "firstName": "<First Name>",
            "lastName": "<Last Name>",
            "token": "<Token sent to the User's Email>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

6) ### Delete User

    - Method `DELETE`
    - Description `Delete User api route`
    - Url <i>`/deleteUser`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `userId` Id of the user to delete
        ```json
        {
            "userId": "<User Id>"
        }
        ```
    - Success Response
        ```
        Not yet concluded
        ```
    - Error Response
        ```
        Not yet concluded
        ```

7) ### Get User Info
    - Method `GET`
    - Description `Get User api route`
    - Url <i>`/getUser`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `userId` Id of the user to update the above data
        ```json
        {
            "userId": "<User Id>"
        }
        ```
    - Success Response
        - `status` positive number `1` for the sucessful return of the api.
        - `message` message denoting the sucessful return of the api.
        - `data` return data requested by the client from the api.
        ```json
        {
            "code": 1,
            "message": "Fetched User Data Sucessfully",
            "data": {
                "userId": "User ID",
                "firstName": "First Name of the User",
                "lastName": "Last Name of the User",
                "email": "Email of the User",
                "createdAt": "Created Time",
                "updatedAt": "Last Updated Time"
            }
        }
        ```
    - Error Response
        - `status` negative status code as per the error.
        - `message` detailed information of the error.
        ```json
        {
            "code": "Status Code",
            "message": "Error Message"
        }
        ```
