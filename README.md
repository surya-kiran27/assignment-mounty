# assignment-mounty
## Installing dependencies
npm install

## Running the application
node app.js

## create a user
Example curl request
curl --location --request POST 'http://localhost:3000/users' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=surya' \
--data-urlencode 'mobile=9177782809' \
--data-urlencode 'email=suryimran@test.com' \
--data-urlencode 'street=dashstreet2' \
--data-urlencode 'locality=dashlocality32' \
--data-urlencode 'city=dashcity' \
--data-urlencode 'state=dashstate' \
--data-urlencode 'pincode=500015' \
--data-urlencode 'coordinatesType=Point' \
--data-urlencode 'coordinates=79.019302,18.112436'

## update user
Example curl request
curl --location --request PUT 'http://localhost:3000/users/update' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=surya' \
--data-urlencode 'mobile=9177782809' \
--data-urlencode 'email=suryimran@test.com' \
--data-urlencode 'street=dashstreet2' \
--data-urlencode 'locality=dashlocality32' \
--data-urlencode 'city=dashcity' \
--data-urlencode 'state=dashstate' \
--data-urlencode 'pincode=500015' \
--data-urlencode 'coordinatesType=Point' \
--data-urlencode 'coordinates=78.4983,17.4399'

## delete a user 
Example curl request
curl --location --request DELETE 'http://localhost:3000/users/delete' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'mobile=9177782803'

## get users based on creation date
curl --location --request GET 'http://localhost:3000/users?sortBy=created&pageNumber=1'

## get users based on distance from given coords
curl --location --request GET 'http://localhost:3000/users?sortBy=distance&pageNumber=1&lat=17.4399&lng=78.4983'
