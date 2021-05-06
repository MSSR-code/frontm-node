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

    - Method `PATCH`
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
        - `foodId` Id of the food item to be deleted

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
        - `foodId` Id of the food item
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
        - `searchParam` "Text to be searched"
        - `sort` "Sorting order: ASC or DSC" (Optional)
        - `paginateFrom` "Pagination begin Index" (Optional)
        - `paginateTo` "Pagination end Index" (Optional)
        - `priceFrom` "Price Range Min. Bound" (Optional)
        - `priceTo` "Price Range Max. Bound" (Optional)
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




## Inventory Api's

The inventory is stored in `Redis` as a key-value pair. The key being `foodId` and the value `quantity`


1. ### Update Inventory

    - Method `PATCH`
    - Url <i>`/inventory/updateInventory`</i>
    - Url Parameters
        - None
    - Body Parameters
        Array of the `foodId` and the `quantity` sent as shown in the example.
        
        Example:
        ```json
        {
            "inventory" : [
                {
                    "foodId":"<food Id>",
                    "quantity": "<quantity of the food Item>"
                },
            ]
        }
        ```
    - Success Response
        ```json
        {
            "message": "Successfully Updated the Inventory."
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

2. ### Delete Food Item from Inventory

    - Method `DELETE`
    - Url <i>`/inventory/deleteFoodItem`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `foodId` Id of the food item to be deleted
        
        Example:
        ```json
        {
            "foodId": "<foodId>"
        }
        ```
    - Success Response
        ```json
        {
            "message": "Successfully deleted food item",
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

3. ### Get Food Item Quantity

    - Method `GET`
    - Url <i>`/inventory/getFoodItemQuantity`</i>
    - Url Parameters
        - `foodId` Id of the food item
    - Body Parameters
        - None
    - Success Response
        ```json
        {
            "message": "Successfully fetched quantity",
            "quantity": "<Food Item Quantity>"
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

4. ### Get Inventory Status

    - Method `GET`
    - Url <i>`/inventory/getInventoryStatus`</i>
    - Url Parameters
        - None
    - Body Parameters
        - None
    - Success Response
        ```json
        {
            "message": "Successfully fetched quantity",
            "inventory": {
                "<foodId>":"<quantity>"
            }
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


## Order Api's

Order Data Schema

```json
{
    
    "_id": "MongoDB Object ID",
    "orderId": "Order Unique Id based on UUID4",
    "order":"Array of the ordered food with quantity, { foodId: '', quantity: '' }",
    "createdAt": "Created TimeStamp",
    "updatedAt": "Last Updated TimeStamp",
    "__v": 0
}
```

1. ### Add Food Item

    - Method `PUT`
    - Url <i>`/order/addOrder`</i>
    - Url Parameters
        - None
    - Body Parameters
        - `orderedItems` Array of the ordered items as object
        
        Example:
        ```json
        {
            "orderedItems" :[
                {"foodId":"<foodId>","quantity":"<quantity ordered>"}
            ]
        }
        ```
    - Success Response
        ```json
        {
            "message": "Successfully Created Order",
            "orderId": "<orderId>"
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

4. ### Get Order Details

    - Method `GET`
    - Url <i>`/order/getOrder`</i>
    - Url Parameters
        - `orderId` Id of the order 
    - Body Parameters
        - None
    - Success Response
        ```json
        {
            "message": "Fetched Order Data Successfully",
            "data": "[<Array of the Individual food orders>]"
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