# List of API's

Return Codes Similar for all Api's
| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |



## Food Item Api's

Food Item Data Schema

```json
{
    
    "_id": "MongoDB Object ID",
    "foodId": "Food Item Unique Id based on UUID4",
    "name": "Food Item Name string Max: 120 Chars",
    "category": "Food Item Category string Max: 120 Chars",
    "cuisine": "Food Item Cuisine string Max: 120 Chars",
    "price": "Food Item Price",
    "active": "Food Item Active Status",
    "createdAt": "Created TimeStamp",
    "updatedAt": "Last Updated TimeStamp",
    "__v": 0
}
```

1. ### Add Food Item

    - Method `PUT`
    - Url <i>`/foodItem/addFoodItem`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `foodItemName` Name of the Food Item
        - `foodItemCategory` Category of the Food Item
        - `foodItemCuisine` Cuisine of the Food Item to be Added
        - `foodItemPrice` Price of the Food Item to be Added
        - `foodItemActive` Active Status of the Food Item to be Added(Optional)
        
        Example:
        ```json
        {
            "foodItemName":"Idli",
            "foodItemCategory":"breakfast",
            "foodItemCuisine":"",
            "foodItemPrice":50,
            "foodItemActive":true
        }
        ```
    - Success Response
        ```json
        {
            "message": "Successfully Created Food Item",
            "foodId": "<foodId>"
        }
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "message": "Error Message"
                }
            ]
        }
        ```

2. ### Update Food Item

    - Method `PATCh`
    - Url <i>`/foodItem/updateFoodItem`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `foodId` Id of the food item to be changed
        - `foodItemName` Name of the Food Item(Optional)
        - `foodItemCategory` Category of the Food Item(Optional)
        - `foodItemCuisine` Cuisine of the Food Item(Optional)
        - `foodItemPrice` Price of the Food Item(Optional)
        - `foodItemActive` Active Status of the Food Item(Optional)
        
        Example:
        ```json
        {
            "foodId": "<foodId>",
            "foodItemCategory":"lunch"
        }
        ```
    - Success Response
        ```json
        {
            "message": "Updated Food Item Data Successfully",
        }
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "message": "Error Message"
                }
            ]
        }
        ```

3. ### Delete Food Item

    - Method `DELETE`
    - Url <i>`/foodItem/deleteFoodItem`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `foodId` Id of the food item to be changed
        
        Example:
        ```json
        {
            "foodId": "<foodId>"
        }
        ```
    - Success Response
        ```json
        {
            "message": "Deleted Food Item Data Successfully",
        }
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "message": "Error Message"
                }
            ]
        }
        ```

4. ### Get Food Item

    - Method `GET`
    - Url <i>`/foodItem/getFoodItem`</i>
    - Url Parameters
        -`foodId` Id of the food item to be changed
    - Body Parameters
        - None
    - Success Response
        ```json
        {
            "message": "Fetched Food Item Data Successfully",
            "data": "<Food Item Object>"
        }
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "message": "Error Message"
                }
            ]
        }
        ```

5. ### Food Item Search
    - Method `GET`
    - Url <i>`/foodItem/searchFoodItems`</i>
    - Url Parameters
        -`searchParam` "Text to be searched"
        -`sort` "Sorting order: ASC or DSC" (Optional)
        -`paginateFrom` "Pagination begin Index" (Optional)
        -`paginateTo` "Pagination end Index" (Optional)
        -`priceFrom` "Price Range Min. Bound" (Optional)
        -`priceTo` "Price Range Max. Bound" (Optional)
    - Body Parameters
        - None
    - Success Response
        ```json
        {
            "message": "Fetched Food Item Data Successfully",
            "data": ["<Array of Food Item Object>"]
        }
        ```
    - Error Response
        ```json
        {
            "errors": [
                {
                    "message": "Error Message"
                }
            ]
        }
        ```



